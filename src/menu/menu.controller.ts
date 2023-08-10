import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { Request } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { MenuResponse } from './vo/menu.vo';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateMenuDto } from './dto/update-menu.dto';
@ApiTags('菜单模块')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @ApiBearerAuth()
  @ApiOperation({
    description: '新增菜单',
  })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    description: '修改菜单',
  })
  @Put()
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }
  @Get()
  @ApiOperation({
    description: '获取菜单列表',
  })
  @ApiBearerAuth()
  @ApiOkResponse({ type: MenuResponse })
  findMenu(@Request() req) {
    return this.menuService.findMenu(req.user);
  }
}
