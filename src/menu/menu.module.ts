import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';

import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}
