import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateRatingDto} from './dto/create-rating.dto'
import {UpdateRatingDto} from './dto/update-rating.dto'
import {PrismaService} from '../../prisma/prisma.service'
import {Rating} from '@prisma/client'
import {S3Service} from 'src/s3/s3.service'
import {Multer} from 'multer'

type CreateRatingParams = CreateRatingDto & {userId: string; file?: Multer.File}
@Injectable()
export class RatingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly s3Service: S3Service
    ) {}
    async create(createRatingDto: CreateRatingParams): Promise<Rating> {
        const transaction = await this.prisma.$transaction(async prisma => {
            const point = await prisma.point.create({
                data: {
                    latitude: createRatingDto.latitude,
                    longitude: createRatingDto.longitude,
                    type: createRatingDto.ratingType
                }
            })

            let fileUrl: string | null = null

            if (createRatingDto.file) {
                const uploadResult = await this.s3Service.uploadFile(
                    createRatingDto.file,
                    'ratings'
                )
                fileUrl = uploadResult.url
            }
            const rating = await prisma.rating.create({
                data: {
                    debility: createRatingDto.debility,
                    description: createRatingDto.description,
                    ratingType: createRatingDto.ratingType,
                    pointId: point.id,
                    fileUrl,
                    userId: createRatingDto.userId
                }
            })
            return rating
        })

        return transaction
    }

    async findAll(): Promise<Rating[]> {
        const ratings = await this.prisma.rating.findMany()
        return ratings
    }

    async findOne(id: string): Promise<Rating> {
        const rating = await this.prisma.rating.findUnique({where: {id}})

        if (!rating) {
            throw new NotFoundException('Rating not found')
        }
        return rating
    }

    async update(id: string, updateRatingDto: UpdateRatingDto): Promise<Rating> {
        const rating = await this.prisma.rating.findUnique({where: {id}})

        if (!rating) {
            throw new NotFoundException('Rating not found')
        }
        const updatedRating = await this.prisma.rating.update({where: {id}, data: updateRatingDto})

        return updatedRating
    }

    async remove(id: string) {
        const rating = await this.prisma.rating.findUnique({where: {id}})

        if (!rating) {
            throw new NotFoundException('Rating not found')
        }
        await this.prisma.rating.delete({where: {id}})
    }
}
