import {Injectable, NotFoundException} from '@nestjs/common'
import {CreateRatingDto} from './dto/create-rating.dto'
import {UpdateRatingDto} from './dto/update-rating.dto'
import {PrismaService} from '../../prisma/prisma.service'
import {Rating} from '@prisma/client'

@Injectable()
export class RatingService {
    constructor(private readonly prisma: PrismaService) {}
    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        const rating = await this.prisma.rating.create({data: createRatingDto})
        return rating
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
        await this.prisma.rating.update({where: {id}, data: updateRatingDto})

        return rating
    }

    async remove(id: string) {
        const rating = await this.prisma.rating.findUnique({where: {id}})

        if (!rating) {
            throw new NotFoundException('Rating not found')
        }
        await this.prisma.rating.delete({where: {id}})
    }
}
