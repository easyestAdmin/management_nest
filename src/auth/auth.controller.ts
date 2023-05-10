/*
 * @Description:
 * @Date: 2023-05-06 18:04:31
 * @Author: didi
 * @LastEditTime: 2023-05-10 15:57:38
 */
import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

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
      throw new ApiException('用户名或密码不能为空', 10012);
    }
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.authService.findAll();
  }
}
