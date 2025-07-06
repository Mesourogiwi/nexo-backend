import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import {ValidationPipe} from '@nestjs/common'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors()
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true
        })
    )

    const config = new DocumentBuilder()
        .setTitle('Nexo API specification')
        .setDescription('The nexo project')
        .setVersion('0.1.0')
        .addTag('acessibility')
        .build()

    const documentFactory = () => SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, documentFactory)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
