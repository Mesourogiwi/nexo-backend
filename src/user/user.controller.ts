import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common'
import {UserService} from './user.service'
import {CreateUserDto} from './dto/create-user.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {Public} from 'src/auth/constants/constants'
import {Roles} from 'src/auth/roles.decorator'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Public()
    create(@Body() createUserDto: Omit<CreateUserDto, 'role'>) {
        return this.userService.create(createUserDto)
    }

    @Roles('ADMIN')
    @Get()
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id)
    }
}
