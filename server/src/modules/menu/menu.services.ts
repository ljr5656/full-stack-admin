import { Model } from 'mongoose';
import { Menu } from './schemas/menu.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import {
  CreateMenuDto,
  DeleteMenuDto,
  UpdateMenuDto,
} from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(@InjectModel('Menu') private readonly menuModel: Model<Menu>) {}

  async getMenuList(): Promise<Menu[]> {
    return await this.menuModel.find({ _d: 0 }).exec();
  }
  async addMenu(createMenuDto: CreateMenuDto): Promise<Menu> {
    const createMenu = new this.menuModel(createMenuDto);
    const savedMenu = await createMenu.save();

    if (createMenuDto.parent_id === '' || createMenuDto.parent_id === null) {
      await this.menuModel.findByIdAndUpdate(createMenuDto.parent_id, {
        $push: { children: savedMenu._id },
      });
    }

    return savedMenu;
  }
  async removeMenu(deleteMenuDto: DeleteMenuDto): Promise<Menu | null> {
    return await this.menuModel
      .findByIdAndUpdate(deleteMenuDto._id, { _d: 1 }, { new: true })
      .exec();
  }

  async updateMenu(updateMenuDto: UpdateMenuDto): Promise<Menu | null> {
    return await this.menuModel
      .findByIdAndUpdate(updateMenuDto._id, updateMenuDto, { new: true })
      .exec();
  }
}
