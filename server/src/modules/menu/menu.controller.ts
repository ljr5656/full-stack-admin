import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MenuService } from './menu.services';
import {
  CreateMenuDto,
  DeleteMenuDto,
  UpdateMenuDto,
} from './dto/create-menu.dto';
import { ObjectIdPipe } from 'src/common/pipe/objectId.pipe';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('list')
  async getList() {
    return await this.menuService.getMenuList();
  }

  @Post('add')
  async add(@Body() createMenuDto: CreateMenuDto) {
    return await this.menuService.addMenu(createMenuDto);
  }

  @Post('update')
  @UsePipes(new ObjectIdPipe())
  async update(@Body() updateMenuDto: UpdateMenuDto) {
    return await this.menuService.updateMenu(updateMenuDto);
  }

  @Post('remove')
  @UsePipes(new ObjectIdPipe())
  async remove(@Body() deleteMenuDto: DeleteMenuDto) {
    return await this.menuService.removeMenu(deleteMenuDto);
  }
}
