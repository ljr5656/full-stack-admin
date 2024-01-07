// src/users/users.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (
        error instanceof Error.ValidationError &&
        error.name === 'ValidationError'
      ) {
        // 处理唯一键冲突错误
        if (error.message.includes('duplicate key error')) {
          throw new ConflictException('Username or email already exists.');
        }
      }
      // 处理其他错误
      throw error;
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
}
