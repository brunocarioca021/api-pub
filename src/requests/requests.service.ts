import { Requests } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Injectable()
export class RequestsService {
  constructor(private prismaService: PrismaService) {}

  async create(createRequestDto: CreateRequestDto): Promise<Requests> {
    return await this.prismaService.requests.create({
      data: createRequestDto,
      include: {
        Table: true,
        Menu: true,
      },
    });
  }

  async readAll(): Promise<Requests[]> {
    return await this.prismaService.requests.findMany({
      include: {
        Table: true,
        Menu: true,
      },
    });
  }

  async readOne(id: number): Promise<Requests> {
    const requestsExists = await this.prismaService.requests.findUnique({
      where: {
        id: id,
      },
    });

    if (!requestsExists) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return await this.prismaService.requests.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        Table: true,
        Menu: true,
      },
    });
  }

  async update(
    id: number,
    updateRequestDto: UpdateRequestDto,
  ): Promise<Requests> {
    const requestsExist = await this.prismaService.requests.findUnique({
      where: {
        id: id,
      },
    });

    if (!requestsExist) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return await this.prismaService.requests.update({
      where: {
        id: Number(id),
      },
      data: updateRequestDto,
      include: {
        Table: true,
        Menu: true,
      },
    });
  }

  async delete(id: number): Promise<Requests> {
    const requestsExist = await this.prismaService.requests.findUnique({
      where: {
        id: id,
      },
    });

    if (!requestsExist) {
      throw new NotFoundException('Pedido não encontrado');
    }

    return this.prismaService.requests.delete({
      where: {
        id: Number(id),
      },
      include: {
        Table: true,
        Menu: true,
      },
    });
  }
}
