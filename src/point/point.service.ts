import {Injectable, NotFoundException} from '@nestjs/common'
import {CreatePointDto} from './dto/create-point.dto'
import {PrismaService} from 'prisma/prisma.service'
import {Point} from '@prisma/client'

@Injectable()
export class PointService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<Point[]> {
        const points = await this.prisma.point.findMany({
            include: {
                ratings: {
                    include: {
                        user: true
                    }
                }
            }
        })
        return points
    }

    async findOne(id: string): Promise<Point | null> {
        const point = await this.prisma.point.findUnique({
            where: {id},
            include: {
                ratings: {
                    include: {
                        user: true
                    }
                }
            }
        })

        if (!point) {
            throw new NotFoundException('Point not found')
        }

        return point
    }

    async remove(id: string) {
        const point = await this.prisma.point.findUnique({where: {id}})

        if (!point) {
            throw new NotFoundException('Point not found')
        }
        await this.prisma.point.delete({where: {id}})
    }
}
