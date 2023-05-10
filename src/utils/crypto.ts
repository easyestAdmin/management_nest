/*
 * @Description:
 * @Date: 2023-05-06 16:53:30
 * @Author: didi
 * @LastEditTime: 2023-05-06 17:08:30
 */
import * as crypto from 'crypto';
export default (value: string, salt: string) =>
  crypto.pbkdf2Sync(value, salt, 1000, 18, 'sha256').toString();
