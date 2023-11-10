import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Song } from '../../models/entities/song.entity';
import { Playlist } from '../../models/entities/playlist.entity';
import { Club } from '../../models/entities/club.entity';
import { ApiCredential } from '../../models/entities/apiCredential.entity';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forFeature([ Song, Playlist, Club, ApiCredential ]),
    HttpModule,
  ],
  controllers: [ClubsController],
  providers: [ClubsService, SpotifyService],
})
export class ClubsModule {}
