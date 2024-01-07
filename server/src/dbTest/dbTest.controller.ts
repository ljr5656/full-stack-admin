import { Controller, Get } from '@nestjs/common';

@Controller('test')
export class DbTestController {
  @Get()
  findAll(): string {
    return 'asd';
  }
}
