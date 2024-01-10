import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema extends Document {
  @Prop({ default: 0 })
  _d: 0 | 1;

  @Prop({ default: Date.now() })
  createTime: number;

  @Prop({ default: Date.now() })
  updateTime: number;
}
