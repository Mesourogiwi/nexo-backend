import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

export class SignInDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'email do usuário',
        example: 'user@example.com',
        required: true,
        type: String
    })
    email: string

    @IsNotEmpty()
    @ApiProperty({
        description: 'Senha do usuário',
        example: 'Senha123!',
        required: true,
        type: String
    })
    password: string
}
