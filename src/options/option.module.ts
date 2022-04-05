import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { OptionService } from './option.service';
import { OptionController } from './option.controller';

import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [OptionController],
  providers: [OptionService, PrismaService],
})
export class OptionModule {}
