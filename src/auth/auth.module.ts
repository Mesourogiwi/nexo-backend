import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {UserModule} from 'src/user/user.module'
import {JwtModule} from '@nestjs/jwt'
import {AuthController} from './auth.controller'
import {jwtConstants} from './constants'
import {UserService} from 'src/user/user.service'
import {PrismaService} from '../../prisma/prisma.service'

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '20d'}
        })
    ],
    providers: [AuthService, UserService, PrismaService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
