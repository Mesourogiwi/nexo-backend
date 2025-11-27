import {Module} from '@nestjs/common'
import {RatingService} from './rating.service'
import {RatingController} from './rating.controller'
import {PrismaService} from '../../prisma/prisma.service'
import {S3Service} from 'src/s3/s3.service'

@Module({
    controllers: [RatingController],
    providers: [RatingService, PrismaService, S3Service]
})
export class RatingModule {}
