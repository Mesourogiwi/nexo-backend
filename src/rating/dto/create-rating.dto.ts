import {ApiProperty} from '@nestjs/swagger'
import {DebilitiesType, RatingType} from '@prisma/client'
import {IsEnum, IsNotEmpty, IsString} from 'class-validator'

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        description: 'Descrição do rating',
        example: 'Avaliação sobre a acessibilidade do local'
    })
    description: string

    @IsNotEmpty()
    @IsEnum(RatingType)
    @ApiProperty({
        required: true,
        description: 'Tipo de avaliação',
        example: 'POSITIVE'
    })
    ratingType: RatingType

    @IsNotEmpty()
    @IsEnum(DebilitiesType)
    @ApiProperty({
        required: true,
        description: 'Tipo de deficiência do usuário que está avaliando',
        example: 'MOBILITY'
    })
    debility: DebilitiesType

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        description: 'Latitude do ponto',
        example: '-23.55052'
    })
    latitude: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        required: true,
        description: 'Longitude do ponto',
        example: '-46.633308'
    })
    longitude: string
}
