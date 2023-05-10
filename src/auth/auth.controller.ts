/*
 * @Description:
 * @Date: 2023-05-06 18:04:31
 * @Author: didi
 * @LastEditTime: 2023-05-10 14:09:56
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from 'src/public/public.decorator';
import { ApiException } from 'src/common/filter/http-exception/api.exception';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  create(@Body() createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    if (!username || !password) {
      throw new ApiException('用户名密码不能为空', 10012);
    }
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll(@Request() req) {
    console.log(req.user, '-------');

    return this.authService.findAll();
  }
}
