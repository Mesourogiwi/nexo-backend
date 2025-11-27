import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common'
import {RatingService} from './rating.service'
import {CreateRatingDto} from './dto/create-rating.dto'
import {UpdateRatingDto} from './dto/update-rating.dto'
import {Public} from 'src/auth/constants/constants'
import {ApiBearerAuth} from '@nestjs/swagger'
import {FileInterceptor} from '@nestjs/platform-express'
import {Multer} from 'multer'

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('file'))
    create(
        @UploadedFile() file: Multer.File,
        @Body() createRatingDto: CreateRatingDto,
        @Request() req
    ) {
        const userId = req.user.id
        return this.ratingService.create({...createRatingDto, userId, file})
    }

    @Public()
    @Get()
    findAll() {
        return this.ratingService.findAll()
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.ratingService.findOne(id)
    }

    @Patch(':id')
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
        return this.ratingService.update(id, updateRatingDto)
    }

    @Delete(':id')
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.ratingService.remove(id)
    }
}
