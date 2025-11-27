import {IsEmail, IsEnum, IsNotEmpty, IsString} from 'class-validator'
import {UserRole} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(UserRole)
    @ApiProperty()
    role: UserRole
}
