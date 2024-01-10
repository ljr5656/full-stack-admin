import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from 'src/common/schemas/base.schemas';

@Schema()
export class Menu extends BaseSchema {
  @Prop({ unique: true })
  label: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Menu', default: null })
  parent: Menu;

  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Menu', default: [] })
  children: MongooseSchema.Types.ObjectId[];
}

export const MenuSchema = SchemaFactory.createForClass(Menu);
