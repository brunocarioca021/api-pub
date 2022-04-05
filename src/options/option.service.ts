import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Options } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { OptionDto } from './dto/option.dto';

@Injectable()
export class OptionService {
  constructor(private prismaService: PrismaService) {}

  async create(optionDto: OptionDto): Promise<Options> {
    return this.prismaService.options.create({
      data: optionDto,
      include: {
        itens: true,
      },
    });
  }

  async readAll(): Promise<Options[]> {
    return this.prismaService.options.findMany({
      select: {
        id: true,
        title: true,
        itens: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async readOne(id: number): Promise<Options> {
    const optionExists = await this.prismaService.options.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!optionExists) {
      throw new NotFoundException('Opção não encontrada');
    }

    return this.prismaService.options.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        itens: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async update(id: number, optionDto: OptionDto): Promise<Options> {
    const optionExists = await this.prismaService.options.findUnique({
      where: {
        id: id,
      },
    });

    if (!optionExists) {
      throw new NotFoundException('Opção não encontrada');
    }

    return this.prismaService.options.update({
      where: {
        id: Number(id),
      },
      data: optionDto,
    });
  }

  async delete(id: number): Promise<Options> {
    const optionExists = await this.prismaService.options.findUnique({
      where: {
        id: id,
      },
    });

    if (!optionExists) {
      throw new NotFoundException('Opção não encontrada');
    }

    const isoptionBeingUsed = await this.prismaService.menu.findMany({
      where: {
        optionsId: Number(id),
      },
    });

    if (isoptionBeingUsed.length > 0) {
      throw new ConflictException(
        'Não foi possível apagar esta opção, pois está sendo usada no momento.',
      );
    }

    return this.prismaService.options.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
