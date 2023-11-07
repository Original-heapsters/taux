import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MusicModule } from './modules/music/music.module';
import { ClubsModule } from './modules/clubs/clubs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    HttpModule,
    MusicModule,
    ClubsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
