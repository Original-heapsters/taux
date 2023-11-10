import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../../models/entities/song.entity';
import { Club } from '../../models/entities/club.entity';
import { Playlist } from '../../models/entities/playlist.entity';
import { AddPlaylistsDto } from '../../models/dtos/add-playlists.dto';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    @InjectRepository(Club) private clubRepository: Repository<Club>,
    private readonly spotifyService: SpotifyService
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
    const testSong: Song = this.songRepository.create(this.sampleSong);
    return testSong;
  }

  async addPlaylists(clubId: string, addPlaylistsDto: AddPlaylistsDto): Promise<Playlist[]> {
    const songList: Song[] = [];

    for (const id of addPlaylistsDto.playlistIds) {
      const tracks = await this.spotifyService.getTracksFromPlaylist(id);
      for (const track of tracks) {
        const tmpTrack: Partial<Song> = {
          name: track.track.name,
          uri: track.track.uri,
          trackId: track.track.id,
        }
        const songObject: Song = this.songRepository.create(tmpTrack);
        songList.push(songObject);
      }
    }

    const tmpPlaylist: Partial<Playlist> = {
      songs: songList,
    };
    const djSet: Playlist = this.playlistRepository.create(tmpPlaylist);
    return [djSet];
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
