import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema extends Document {
  @Prop({ default: 0 })
  _d: 0 | 1;

  @Prop({ default: Date.now() })
  create_time: number;

  @Prop({ default: Date.now() })
  update_time: number;
}
