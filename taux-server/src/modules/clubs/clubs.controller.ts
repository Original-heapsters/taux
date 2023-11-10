import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from '../../models/entities/club.entity';
import { Song } from '../../models/entities/song.entity';
import { Playlist } from '../../models/entities/playlist.entity';
import { AddPlaylistsDto } from '../../models/dtos/add-playlists.dto';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async getAllClubs() {
    return await this.clubsService.getAll();
  }

  @Post('/new')
  async createClub() {
    const newClub: Club = await this.clubsService.create();
    return newClub;
  }

  @Post('/:id/songs/add')
  async addSong(@Param('id') clubId: string) {
    const addedSong: Song = await this.clubsService.addSong(clubId);
    return addedSong;
  }

  @Post('/:id/playlists/add')
  async addPlaylists(@Param('id') clubId: string, @Body() addPlaylistsDto: AddPlaylistsDto) {
    const addedPlaylists: Playlist[] = await this.clubsService.addPlaylists(clubId, addPlaylistsDto);
    return addedPlaylists;
  }

  @Get('/:id/dj')
  async getDjSet(@Param('id') clubId: string) {
    const djSet: Playlist = await this.clubsService.getDjSet(clubId);
    return djSet;
  }
}
