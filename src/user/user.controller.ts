/*
 * @Date: 2023-05-04 16:39:46
 * @Author: 东方小月
 * @LastEditTime: 2023-05-10 16:50:45
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/public/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: RegisterUserDto) {
    return this.userService.register(createUserDto);
  }

  @Public()
  @Post()
  findOne(@Body() a) {
    console.log(a);

    return this.userService.findOne(a.username);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Public()
  @Get('getUser')
  getUser(@Headers('authorization') token) {
    return this.userService.getUser(token);
  }
}
