import { Controller, Get, Param } from '@nestjs/common';
import { SpotifyService } from '../../services/spotify/spotify.service';

@Controller('music')
export class MusicController {
	constructor(private readonly spotifyService: SpotifyService){}

	@Get('/artist/:id')
	async getArtist(@Param('id') artistId: string): Promise<{}> {
		return await this.spotifyService.getArtist(artistId);
	}
}
