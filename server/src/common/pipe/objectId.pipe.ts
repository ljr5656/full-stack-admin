import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdPipe implements PipeTransform<any, Types.ObjectId> {
  transform(value: any, metadata: ArgumentMetadata): Types.ObjectId {
    if (!value && !Types.ObjectId.isValid(value._id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    value._id = new Types.ObjectId(value._id);
    return value;
  }
}
