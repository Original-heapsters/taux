import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../../models/entities/song.entity';
import { Club } from '../../models/entities/club.entity';
import { Playlist } from '../../models/entities/playlist.entity';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    @InjectRepository(Club) private clubRepository: Repository<Club>,
    ) {}

  private sampleSong: Partial<Song> = {
    name: 'myCoolSong',
    uri: 'someUri',
    trackId: 'mySampleTrackId',
  };

  // private samplePlaylist: Partial<Playlist> = {
  //   songs: [this.sampleSong, this.sampleSong],
  // };

  private sampleClub: Partial<Club> = {
    name: 'myCoolClub',
    created: new Date(),
    updated: new Date(),
    // songs: [this.sampleSong, this.sampleSong],
  };

  async getAll(): Promise<Club[]> {
    return this.clubRepository.find();
  }

  async create(): Promise<Club> {
    const createdClub: Club = this.clubRepository.create(this.sampleClub);
    return this.clubRepository.save(createdClub);
  }

  async addSong(clubId: string): Promise<Song> {
    console.log(clubId);
    const testSong: Song = this.songRepository.create(this.sampleSong);
    return testSong;
  }

  async getDjSet(clubId: string): Promise<Playlist> {
    const testSong: Song = this.songRepository.create(this.sampleSong);
    const tmpPlaylist: Partial<Playlist> = {
      songs: [testSong],
    };
    const djSet: Playlist = this.playlistRepository.create(tmpPlaylist);
    return djSet;
  }
}
