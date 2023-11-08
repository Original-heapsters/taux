import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../../models/entities/song.entity';
import { Playlist } from '../../models/entities/playlist.entity';
import { Club } from '../../models/entities/club.entity';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forFeature([ Song, Playlist, Club ]),
  ],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
