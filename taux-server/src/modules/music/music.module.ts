import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MusicController } from './music.controller';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    HttpModule,
  ],
  controllers: [MusicController],
  providers: [SpotifyService]
})
export class MusicModule {}
