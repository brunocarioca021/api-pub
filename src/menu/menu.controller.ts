import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { Menu } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enum/roles.enum';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

import { MenuService } from './menu.service';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Cria um pedido no menu' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createCreateMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menuService.create(createCreateMenuDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os pedidos do menu' })
  readAll(): Promise<Menu[]> {
    return this.menuService.readAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista um pedido no menu pelo ID' })
  readOne(@Param('id') id: number): Promise<Menu> {
    return this.menuService.readOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Altera um pedido do menu pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menuService.update(id, updateMenuDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary:
      'Exclui um pedido do menu pelo ID caso o mesmo não esteja sendo usado',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Menu> {
    return this.menuService.delete(id);
  }
}
