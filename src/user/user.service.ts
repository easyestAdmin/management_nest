/*
 * @Date: 2023-05-04 16:39:46
 * @Author: 东方小月
 * @LastEditTime: 2023-05-06 18:19:00
 */
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import encry from '../utils/crypto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  // 生成token
  createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }
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

  async login(loginUserDto) {
    const { username, password } = loginUserDto;
    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (!existUser)
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);

    const islogin = existUser.password == encry(password, existUser.salt);

    if (!islogin) throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    const token = this.createToken({ username, password });
    console.log(token);

    return { token };
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
