import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {PrismaService} from '../../prisma/prisma.service'
import {User} from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.create({data: createUserDto})
        return user
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
