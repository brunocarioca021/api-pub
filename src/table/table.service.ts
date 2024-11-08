import { Injectable, NotFoundException } from '@nestjs/common';

import { Table } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';

import { CreateTableDto } from './dto/create-table.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateUsersTableDto } from './dto/update-users.dto';

@Injectable()
export class TableService {
  constructor(private prismaService: PrismaService) {}

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return await this.prismaService.table.create({
      data: {
        share: createTableDto.share,
        cash: createTableDto.cash,
      },
      include: {
        itens: {
          select: {
            Menu: true,
          },
        },
        users: true,
      },
    });
  }

  async readAll(): Promise<Table[]> {
    return await this.prismaService.table.findMany({
      select: {
        id: true,
        itens: {
          select: {
            Menu: true,
          },
        },
        users: true,
        share: true,
        cash: true,
        totalPrice: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async readOne(id: number): Promise<Table> {
    const tableExists = await this.prismaService.table.findUnique({
      where: {
        id: id,
      },
    });

    if (!tableExists) {
      throw new NotFoundException('Mesa não encontrada');
    }

    return await this.prismaService.table.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        itens: {
          select: {
            Menu: true,
          },
        },
        users: true,
        share: true,
        cash: true,
        totalPrice: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updatePrice(
    id: number,
    updatePriceDto: UpdatePriceDto,
  ): Promise<Table> {
    const { share, cash } = updatePriceDto;

    const tableExists = await this.prismaService.table.findUnique({
      where: {
        id: id,
      },
    });

    if (!tableExists) {
      throw new NotFoundException('Mesa não encontrada');
    }

    const itensOnTable = await this.prismaService.table.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        itens: {
          include: {
            Menu: {
              select: {
                price: true,
              },
            },
          },
        },
      },
    });

    const priceList: number[] = [];

    itensOnTable.itens.map((i: any) => priceList.push(i.Menu.price));

    let totalPrice: number;

    if (
      (share === true && cash === false) ||
      (share === false && cash === true)
    ) {
      totalPrice = Number(
        (priceList.reduce((a, b) => a + b, 0) * 5).toFixed(2),
      );
    } else if (share === false && cash === false) {
      totalPrice = Number(priceList.reduce((a, b) => a + b, 0).toFixed(2));
    } else {
      totalPrice = Number(
        (priceList.reduce((a, b) => a + b, 0) * 10).toFixed(2),
      );
    }

    return await this.prismaService.table.update({
      where: {
        id: Number(id),
      },
      data: {
        share: share,
        cash: cash,
        totalPrice: totalPrice,
      },
      include: {
        itens: {
          select: {
            Menu: true,
          },
        },
        users: true,
      },
    });
  }

  async updateUsers(
    id: number,
    updateUsersTableDto: UpdateUsersTableDto,
    userId: number,
  ): Promise<Table> {
    const { disconnectUser } = updateUsersTableDto;

    const tableExists = await this.prismaService.table.findUnique({
      where: {
        id: id,
      },
    });

    if (!tableExists) {
      throw new NotFoundException('Mesa não encontrada');
    }

    if (disconnectUser === true) {
      return await this.prismaService.table.update({
        where: {
          id: Number(id),
        },
        data: {
          users: {
            disconnect: {
              id: userId,
            },
          },
        },
        include: {
          itens: {
            select: {
              Menu: true,
            },
          },
          users: true,
        },
      });
    }

    return await this.prismaService.table.update({
      where: {
        id: Number(id),
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        itens: {
          select: {
            Menu: true,
          },
        },
        users: true,
      },
    });
  }

  async delete(id: number): Promise<Table> {
    const tableExists = await this.prismaService.table.findUnique({
      where: {
        id: id,
      },
    });

    if (!tableExists) {
      throw new NotFoundException('Mesa não encontrada');
    }

    return this.prismaService.table.delete({
      where: {
        id: Number(id),
      },
      include: {
        itens: {
          select: {
            Menu: true,
          },
        },
      },
    });
  }
}
