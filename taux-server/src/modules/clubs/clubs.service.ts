import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../../models/entities/song.entity';
import { Club } from '../../models/entities/club.entity';
import { AudioFeature } from '../../models/entities/audioFeature.entity';
import { Playlist } from '../../models/entities/playlist.entity';
import { AddPlaylistsDto } from '../../models/dtos/add-playlists.dto';
import { CreateClubDto } from '../../models/dtos/create-club.dto';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Playlist) private playlistRepository: Repository<Playlist>,
    @InjectRepository(Club) private clubRepository: Repository<Club>,
    @InjectRepository(AudioFeature) private audioFeatureRepository: Repository<AudioFeature>,
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

  async getByName(name: string): Promise<Club> {
    return this.clubRepository.findOneBy({ name: name });
  }

  async getById(id: string): Promise<Club> {
    return this.clubRepository.findOneById(id);
  }

  async create(createClubDto: CreateClubDto): Promise<Club> {
    const newClub: Partial<Club> = {
      name: createClubDto.name,
    };

    const createdClub: Club = this.clubRepository.create(newClub);
    return this.clubRepository.save(createdClub);
  }

  async addSong(clubId: string): Promise<Song> {
    const testSong: Song = this.songRepository.create(this.sampleSong);
    return testSong;
  }

  async getFeaturesForSongs(songs: Song[]): Promise<AudioFeature[]> {

    const songFeatureArray: AudioFeature[] = [];
    const songIds = songs.map((song) => song.trackId);

     const audioFeatureResponse: any = await this.spotifyService.getTrackFeatures(songIds);
     const audioFeatures : any[] = audioFeatureResponse.audio_features;
     const dbFeatures: AudioFeature[] = [];

     for( const feature of audioFeatures) {
      console.log(feature);
      const partialFeature: Partial<AudioFeature> = {
        trackId: feature.id,
        analysisUrl: feature.analysis_url,
        tempo: feature.tempo,
        song: songs.find((song) => song.trackId === feature.id),
      };
      const newFeature = this.audioFeatureRepository.create(partialFeature);
      await this.audioFeatureRepository.save(newFeature)
      dbFeatures.push(newFeature);
     }
    

    return dbFeatures;

  }

  async addPlaylists(clubId: string, addPlaylistsDto: AddPlaylistsDto): Promise<AudioFeature[]> {
    const songList: Song[] = [];
    const songIdList: string[] = [];
    const club = await this.clubRepository.findOneById(clubId);

    for (const id of addPlaylistsDto.playlistIds) {
      const tracks = await this.spotifyService.getTracksFromPlaylist(id);
      for (const track of tracks) {
        const tmpTrack: Partial<Song> = {
          name: track.track.name,
          uri: track.track.uri,
          trackId: track.track.id,
          club
        }
        const songObject: Song = this.songRepository.create(tmpTrack);
        await this.songRepository.save(songObject);
        songList.push(songObject);
        songIdList.push(songObject.trackId);
      }
    }

    const allFeatures: AudioFeature[] = await this.getFeaturesForSongs(songList);

    const tmpPlaylist: Partial<Playlist> = {
      songs: songList,
    };
    const djSet: Playlist = this.playlistRepository.create(tmpPlaylist);
    return allFeatures;
  }

  async getDjSet(clubId: string): Promise<Playlist> {
    const club = await this.clubRepository.findOneById(clubId);
    const songs = await this.songRepository.find({
      where: {
        club: {
          id: clubId,
        },
      },
        relations: {
            club: true,
        },
    });

    const tmpPlaylist: Partial<Playlist> = {
      songs: songs,
    };
    
    const djSet: Playlist = this.playlistRepository.create(tmpPlaylist);
    return djSet;
  }
}
