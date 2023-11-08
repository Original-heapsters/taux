import { Controller, Get, Param } from '@nestjs/common';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Controller('music')
export class MusicController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Get('/playlist/:id')
  async getPlaylist(@Param('id') playlistId: string): Promise<object> {
    return await this.spotifyService.getPlaylist(playlistId);
  }

  @Get('/artist/:id')
  async getArtist(@Param('id') artistId: string): Promise<object> {
    return await this.spotifyService.getArtist(artistId);
  }

  @Get('/track/:id')
  async getTrack(@Param('id') trackId: string): Promise<object> {
    return await this.spotifyService.getTrack(trackId);
  }

  @Get('/track/:id/features')
  async getTrackFeatures(@Param('id') trackId: string): Promise<object> {
    return await this.spotifyService.getTrackFeatures(trackId);
  }
}
