/*
 * @Date: 2023-05-04 16:39:46
 * @Author: 东方小月
 * @LastEditTime: 2023-05-10 16:44:23
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  exports: [UserService],
})
export class UserModule {}
