import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'app' })
  @ApiResponse({ status: 200, description: 'app' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
