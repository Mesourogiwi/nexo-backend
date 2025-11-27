import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class CreatePointDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Latitude do ponto',
        example: '-23.55052',
        required: true
    })
    latitude: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Longitude do ponto',
        example: '-46.633308',
        required: true
    })
    longitude: string

    @IsString()
    @IsOptional()
    @ApiProperty()
    type?: string
}
