import {PartialType} from '@nestjs/mapped-types'
import {CreateAddressDto} from './create-address.dto'
import {IsEnum, IsOptional, IsString} from 'class-validator'
import {AddressType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
    @IsOptional()
    @IsString()
    @ApiProperty()
    zipCode: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    UF: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    city: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    street: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    neighborhood: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    number: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    latitude: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    longitude: string

    @IsOptional()
    @IsString()
    @IsEnum(AddressType)
    @ApiProperty()
    type: AddressType

    @IsOptional()
    @IsString()
    @ApiProperty()
    ratingId: string
}
