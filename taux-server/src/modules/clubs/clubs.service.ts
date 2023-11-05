import { Injectable } from '@nestjs/common';
import { SongDto } from '../../models/song.dto';
import { ClubDto } from '../../models/club.dto';
import { PlaylistDto } from '../../models/playlist.dto';

@Injectable()
export class ClubsService {
	constructor(){}
	private sampleSong: SongDto = {
		trackId: 'mySampleTrackId',
		images: 'mySampleTrackImages',
	};

	private samplePlaylist: PlaylistDto = {
		songs: [ this.sampleSong, this.sampleSong ],
	};

	private sampleClub: ClubDto = {
		id: 'sampleClubId',
		name: 'myCoolClub',
		created: 'now',
		updated: 'now',
		songs: this.samplePlaylist,
	};

	async getAll(): Promise<Array<ClubDto>>{
		return [ this.sampleClub, this.sampleClub ];
	};

	async create(): Promise<ClubDto>{
		return this.sampleClub;
	};

	async addSong(clubId: string): Promise<SongDto>{
		return new Promise(this.sampleSong);
	};

	async getDjSet(clubId: string): Promise<PlaylistDto>{
		return [this.sampleSong, this.sampleSong];
	};
}
