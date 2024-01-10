import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './schemas/menu.schema';
import { MenuService } from './menu.services';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
