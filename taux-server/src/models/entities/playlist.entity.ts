import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Song } from './song.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany((type) => Song, (song) => song.playlist)
  songs: Song[];
}
