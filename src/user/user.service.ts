import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {PrismaService} from '../../prisma/prisma.service'
import {User} from '@prisma/client'
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'

type UserResponse = Omit<User, 'password'>

type CreateUserResponse = UserResponse & {
    accessToken: string
}

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) {}
    async create(createUserDto: Omit<CreateUserDto, 'role'>): Promise<CreateUserResponse> {
        // const user = await this.prisma.user.create({data: createUserDto})
        const existingUser = await this.prisma.user.findFirst({
            where: {
                email: createUserDto.email
            }
        })

        if (existingUser) {
            throw new BadRequestException('User already exists', {
                cause: existingUser,
                description: 'Usuário já cadastrado'
            })
        }

        const saltOrRounds = 10
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds)

        const user = await this.prisma.user.create({
            data: {...createUserDto, password: hashedPassword, role: 'USER'},
            omit: {password: true}
        })

        const payload = {id: user.id, sub: user.id, role: user.role}
        const accessToken = this.jwtService.sign(payload)

        return {
            ...user,
            accessToken
        }
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany()
        return users
    }

    async findOne(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({where: {id}})

        if (!user) {
            throw new NotFoundException('User not found')
        }

        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.prisma.user.findUnique({where: {id}})

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const updatedUser = await this.prisma.user.update({
            where: {id},
            data: updateUserDto
        })

        return updatedUser
    }

    async remove(id: string) {
        const user = await this.prisma.user.findUnique({where: {id}})

        if (!user) {
            throw new NotFoundException('User not found')
        }
        await this.prisma.user.delete({where: {id}})
    }
}
