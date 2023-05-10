/*
 * @Description:
 * @Date: 2023-05-09 14:58:01
 * @Author: didi
 * @LastEditTime: 2023-05-09 14:58:36
 */
import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
