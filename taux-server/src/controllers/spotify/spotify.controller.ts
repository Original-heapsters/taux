import { Controller, Get, Param } from '@nestjs/common';
import { SpotifyService } from '../../services/spotify/spotify.service';
import { ConfigService } from '@nestjs/config';

@Controller('spotify')
export class SpotifyController {
	constructor(private readonly spotifyService: SpotifyService, private readonly configService: ConfigService) {}

	@Get('/artist/:id')
	async getArtist(@Param('id') artistId: string): Promise<{}> {
		return await this.spotifyService.getArtist(artistId);
	}
}

