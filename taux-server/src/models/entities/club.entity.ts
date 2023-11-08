import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Song } from './song.entity';

@Entity()
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updated: Date;

  @OneToMany((type) => Song, (song) => song.club)
  songs: Song[];
}
