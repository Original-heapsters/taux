import { PlaylistDto } from './playlist.dto';

export class ClubDto {
	id: string;
	name: string;
	created: string;
	updated: string;
	songs: PlaylistDto;
}