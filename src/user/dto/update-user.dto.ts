import {PartialType} from '@nestjs/mapped-types'
import {CreateUserDto} from './create-user.dto'
import {IsEmail, IsOptional, IsString} from 'class-validator'
import {UserType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsEmail()
    @IsOptional()
    @ApiProperty()
    email?: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    password?: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    type?: UserType
}
