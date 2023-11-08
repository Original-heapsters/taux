import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from './models/entities/song.entity';
import { Playlist } from './models/entities/playlist.entity';
import { Club } from './models/entities/club.entity';
import { MusicModule } from './modules/music/music.module';
import { ClubsModule } from './modules/clubs/clubs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Song, Playlist, Club],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    MusicModule,
    ClubsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
