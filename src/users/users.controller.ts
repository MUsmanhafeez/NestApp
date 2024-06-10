import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe, Res } from '@nestjs/common';
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { User } from './user.schema';
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Get() //Get /users a
    findAll(@Query('role') role, @Res() res) {
        return this.userService.findAll(role, res)
    }

    @Get(':id') //Get /users/:id
    findOne(@Param('id',) id: number, @Res() res) {
        return this.userService.findOne(id, res)
    }

    @Post() //Post /users
    create(@Body(new ValidationPipe({ transform: true })) user: User, @Res() res) {
        return this.userService.create(user, res)
    }

    @Patch(':id') //Patch /users/:id
    update(@Param('id',) id: number, @Body(new ValidationPipe({ transform: true }))  user: Partial<User>, @Res() res) {
        return this.userService.update(id, user, res)
    }

    @Delete(':id') //Delete /users/:id
    delete(@Param('id', ParseIntPipe) id: number, @Res() res) {
        return this.userService.delete(id, res)
    }
}
