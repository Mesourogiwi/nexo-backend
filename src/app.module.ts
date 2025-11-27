import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {UserModule} from './user/user.module'
import {RatingModule} from './rating/rating.module'
import {PointModule} from './point/point.module'
import {PrismaService} from 'prisma/prisma.service'
import {APP_GUARD} from '@nestjs/core'
import {AuthGuard} from './auth/auth.guard'
import {AuthModule} from './auth/auth.module'
import {S3Module} from './s3/s3.module'
import {S3Service} from './s3/s3.service'

@Module({
    imports: [AuthModule, UserModule, RatingModule, PointModule, S3Module],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        S3Service,
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {}
