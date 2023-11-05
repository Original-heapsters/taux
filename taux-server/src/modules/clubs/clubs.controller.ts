import { Controller, Get, Post, Param } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { ClubDto } from '../../models/club.dto';
import { SongDto } from '../../models/song.dto';
import { PlaylistDto } from '../../models/playlist.dto';

@Controller('clubs')
export class ClubsController {
	constructor(private readonly clubsService: ClubsService){}

	@Get()
	async getAllClubs() {
		return await this.clubsService.getAll();
	}

	@Post('/new')
	async createClub() {
		const newClub: ClubDto = await this.clubsService.create();
		return newClub;
	}

	@Post('/:id/songs/add')
	async addSong(@Param('id') clubId: string) {
		const addedSong: SongDto = this.clubsService.addSong(clubId);
		return `Added ${addedSong} to club ${clubId}`;
	}

	@Get('/:id/dj')
	async getDjSet(@Param('id') clubId: string) {
		const djSet: PlaylistDto = await this.clubsService.getDjSet(clubId);
		return `Dj'ing from club ${clubId}`;
	}
}
