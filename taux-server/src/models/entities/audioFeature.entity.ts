import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Song } from './song.entity';

@Entity()
export class AudioFeature {
  @PrimaryGeneratedColumn('uuid')
  featureId: string;

  @Column({ type: 'varchar', length: 300 })
  trackId: string;

  @Column({ type: 'varchar', length: 300 })
  analysisUrl: string;

  @Column({ type: 'decimal' })
  tempo: number;

  @OneToOne(() => Song, (song) => song.audioFeature)
  song?: Song
}
