import {Injectable, UnauthorizedException} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import {JwtService} from '@nestjs/jwt'
import {PrismaService} from '../../prisma/prisma.service'
import {User} from '@prisma/client'
import {SignInDto} from './dto/signIn.dto'

export type signInResponse = {
    accessToken: string
    user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>
}
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {}

    async signIn(signInInput: SignInDto): Promise<signInResponse> {
        const {email, password} = signInInput
        const user = await this.prisma.user.findUnique({where: {email}})

        const isPasswordValid = user && (await bcrypt.compare(password, user.password))

        if (!isPasswordValid || !user) {
            throw new UnauthorizedException('Invalid credentials', {
                cause: new Error('Invalid credentials'),
                description: 'Usuário ou senha inválidos'
            })
        }
        const payload = {id: user.id, sub: user.id, role: user.role}

        const accessToken = this.jwtService.sign(payload)

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            accessToken
        }
    }
}
