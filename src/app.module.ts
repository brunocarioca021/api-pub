import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TableModule } from './table/table.module';
import { RequestsModule } from './requests/requests.module';
import { OptionModule } from './options/option.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TableModule,
    RequestsModule,
    OptionModule,
    MenuModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
