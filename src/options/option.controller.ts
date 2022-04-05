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

import { Options } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enum/roles.enum';

import { OptionService } from './option.service';

import { OptionDto } from './dto/option.dto';

@ApiTags('option')
@Controller('option')
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Cria uma opção' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() optionDto: OptionDto): Promise<Options> {
    return this.optionService.create(optionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as opções' })
  readAll(): Promise<Options[]> {
    return this.optionService.readAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lista uma opção pelo ID' })
  readOne(@Param('id') id: number): Promise<Options> {
    return this.optionService.readOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Altera uma opção pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: number,
    @Body() optionDto: OptionDto,
  ): Promise<Options> {
    return this.optionService.update(id, optionDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Exclui uma opção pelo ID caso a mesma não esteja sendo usada',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Options> {
    return this.optionService.delete(id);
  }
}
