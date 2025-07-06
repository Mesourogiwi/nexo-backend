import {PartialType} from '@nestjs/mapped-types'
import {CreateRatingDto} from './create-rating.dto'
import {IsEnum, IsNumber, IsOptional, IsString} from 'class-validator'
import {DebilitiesType, RatingType} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'

export class UpdateRatingDto extends PartialType(CreateRatingDto) {
    @IsString()
    @IsOptional()
    @ApiProperty()
    fileUrl?: string

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    upvote?: number

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    downvote?: number

    @IsEnum(RatingType)
    @IsOptional()
    @ApiProperty()
    ratingType?: RatingType

    @IsEnum(DebilitiesType)
    @IsOptional()
    @ApiProperty()
    debilty?: DebilitiesType

    @IsString()
    @IsOptional()
    @ApiProperty()
    userId?: string
}
