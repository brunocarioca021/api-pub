import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Menu } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(private prismaService: PrismaService) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    return await this.prismaService.menu.create({
      data: createMenuDto,
    });
  }

  async readAll(): Promise<Menu[]> {
    return await this.prismaService.menu.findMany();
  }

  async readOne(id: number): Promise<Menu> {
    const MenuExists = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!MenuExists) {
      throw new NotFoundException('Menu não encontrado');
    }

    return await this.prismaService.menu.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const MenuExists = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!MenuExists) {
      throw new NotFoundException('Menu não encontrado');
    }

    return await this.prismaService.menu.update({
      where: { id: Number(id) },
      data: updateMenuDto,
    });
  }

  async delete(id: number): Promise<Menu> {
    const MenuExists = await this.prismaService.menu.findUnique({
      where: {
        id: id,
      },
    });

    if (!MenuExists) {
      throw new NotFoundException('Menu não encontrado');
    }

    const isMenuOnTable = await this.prismaService.table.findMany({
      select: {
        itens: {
          where: { id: Number(id) },
        },
      },
    });

    isMenuOnTable.map((obj) => {
      if (obj.itens.length > 0) {
        throw new ConflictException(
          'Não foi possível apagar este pedido, pois está sendo usado no momento.',
        );
      }
    });

    return this.prismaService.menu.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
