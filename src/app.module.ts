import {Module} from '@nestjs/common'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {UserModule} from './user/user.module'
import { RatingModule } from './rating/rating.module';
import { AddressModule } from './address/address.module';

@Module({
    imports: [UserModule, RatingModule, AddressModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
