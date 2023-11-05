import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
