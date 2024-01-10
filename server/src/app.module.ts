import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { MenuModule } from './modules/menu/menu.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://ljr:123qwe@43.142.100.154:27017/?authSource=demo',
    ),
    UsersModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
