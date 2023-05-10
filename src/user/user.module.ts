/*
 * @Date: 2023-05-04 16:39:46
 * @Author: 东方小月
 * @LastEditTime: 2023-05-10 15:53:08
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
@Module({
  controllers: [UserController],
  providers: [UserService, ConfigService],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
