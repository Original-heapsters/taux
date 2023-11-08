import { Controller, Get, Post, Param } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from '../../models/entities/club.entity';
import { Song } from '../../models/entities/song.entity';
import { Playlist } from '../../models/entities/playlist.entity';

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

  @Get('/:id/dj')
  async getDjSet(@Param('id') clubId: string) {
    const djSet: Playlist = await this.clubsService.getDjSet(clubId);
    return djSet;
  }
}
