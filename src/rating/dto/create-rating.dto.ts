import {ApiProperty} from '@nestjs/swagger'
import {DebilitiesType, RatingType} from '@prisma/client'
import {IsEnum, IsNotEmpty, IsString} from 'class-validator'

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    fileUrl: string

    @IsNotEmpty()
    @IsEnum(RatingType)
    @ApiProperty()
    ratingType: RatingType

    @IsNotEmpty()
    @IsEnum(DebilitiesType)
    @ApiProperty()
    debilty: DebilitiesType

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string
}
