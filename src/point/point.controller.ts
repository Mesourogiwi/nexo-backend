import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common'
import {PointService} from './point.service'
import {CreatePointDto} from './dto/create-point.dto'
import {Public} from 'src/auth/constants/constants'
import {ApiBearerAuth} from '@nestjs/swagger'

@Controller('point')
export class PointController {
    constructor(private readonly pointService: PointService) {}

    @Public()
    @Get()
    findAll() {
        return this.pointService.findAll()
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.pointService.findOne(id)
    }

    @Delete(':id')
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
        return this.pointService.remove(id)
    }
}
