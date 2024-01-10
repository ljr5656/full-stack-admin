import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/schemas/base.schemas';

@Schema()
export class Menu extends BaseSchema {
  @Prop({ unique: true })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Menu', default: null })
  parent_id: Menu;

  @Prop({ unique: true, isNaN: false })
  path: string;

  @Prop({ unique: true, isNaN: false })
  component: string;
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
