import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get()
  getHello(): string {
    console.log(this.configService)
    console.log('test');
    console.log(this.configService.get<string>('SPOTIFY_CLIENT_ID'));
    return this.appService.getHello();
  }
}
