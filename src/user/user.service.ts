/*
 * @Date: 2023-05-04 16:39:46
 * @Author: 东方小月
 * @LastEditTime: 2023-05-10 15:53:24
 */
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import encry from '../utils/crypto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { username } = registerUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser)
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    try {
      const newUser = await this.userRepository.create(registerUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
