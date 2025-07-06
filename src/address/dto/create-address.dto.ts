import {IsEnum, IsNotEmpty, IsString} from 'class-validator'
import {AddressType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'

export class CreateAddressDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    zipCode: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    UF: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    city: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    street: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    neighborhood: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    number: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    latitude: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    longitude: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(AddressType)
    @ApiProperty()
    type: AddressType

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    ratingId: string
}
