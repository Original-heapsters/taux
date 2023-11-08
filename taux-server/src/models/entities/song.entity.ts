import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Club } from './club.entity';
import { Playlist } from './playlist.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  trackId: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  uri: string;

  @ManyToOne(() => Club, (club) => club.songs, { nullable: true })
  club?: Club

  @ManyToOne(() => Playlist, (playlist) => playlist.songs, { nullable: true })
  playlist?: Playlist
  
}
