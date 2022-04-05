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
import { Requests } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@ApiTags('requests')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Cria' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  create(@Body() createRequestDto: CreateRequestDto): Promise<Requests> {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Lista ' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readAll(): Promise<Requests[]> {
    return this.requestsService.readAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Lista um pedido pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  readOne(@Param('id') id: number): Promise<Requests> {
    return this.requestsService.readOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Altera um pedido pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  update(
    @Param('id') id: number,
    @Body() updaterequestDto: UpdateRequestDto,
  ): Promise<Requests> {
    return this.requestsService.update(id, updaterequestDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiOperation({ summary: 'Deleta um pedido pelo ID' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RolesGuard)
  delete(@Param('id') id: number): Promise<Requests> {
    return this.requestsService.delete(id);
  }
}
