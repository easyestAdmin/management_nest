/*
 * @Description:
 * @Date: 2023-05-04 16:39:46
 * @Author: didi
 * @LastEditTime: 2023-05-10 18:17:33
 */
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import encry from '../../utils/crypto';
import * as crypto from 'crypto';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number; // 标记为主键，值自动生成

  @Column({ length: 30 })
  username: string; //用户名
  @Column({ length: 30 })
  nickname: string; //昵称
  @Column()
  password: string; //密码
  @Column({ default: () => '1111' })
  avatar: string; //头像
  @Column({ nullable: true })
  email: string; //邮箱
  @Column({ default: () => '11' })
  role: string; //角色
  @Column()
  salt: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);

    if (!this.nickname) this.nickname = 'easyest用户';
  }
}
