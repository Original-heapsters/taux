import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MusicController } from './music.controller';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { ApiCredential } from '../../models/entities/apiCredential.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forFeature([ ApiCredential ]),
    HttpModule,
  ],
  controllers: [MusicController],
  providers: [SpotifyService],
})
export class MusicModule {}
