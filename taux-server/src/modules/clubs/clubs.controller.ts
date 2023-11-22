import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { Club } from '../../models/entities/club.entity';
import { Song } from '../../models/entities/song.entity';
import { AudioFeature } from '../../models/entities/audioFeature.entity';
import { Playlist } from '../../models/entities/playlist.entity';
import { AddPlaylistsDto } from '../../models/dtos/add-playlists.dto';
import { CreateClubDto } from '../../models/dtos/create-club.dto';

@Controller('clubs')
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async getAllClubs() {
    return await this.clubsService.getAll();
  }

  @Get('/name/:name')
  async getByName(@Param('name') name: string) {
    return await this.clubsService.getByName(name);
  }

  @Get('/:id')
  async getById(@Param('id') clubId: string) {
    return await this.clubsService.getById(clubId);
  }

  @Post('/new')
  async createClub(@Body() createClubDto: CreateClubDto) {

    const newClub: Club = await this.clubsService.create(createClubDto);
    return newClub;
  }

  @Post('/:id/songs/add')
  async addSong(@Param('id') clubId: string) {
    const addedSong: Song = await this.clubsService.addSong(clubId);
    return addedSong;
  }

  @Post('/:id/playlists/add')
  async addPlaylists(@Param('id') clubId: string, @Body() addPlaylistsDto: AddPlaylistsDto) {
    const addedPlaylists: AudioFeature[] = await this.clubsService.addPlaylists(clubId, addPlaylistsDto);
    return addedPlaylists;
  }

  @Get('/:id/dj')
  async getDjSet(@Param('id') clubId: string) {
    const djSet: Playlist = await this.clubsService.getDjSet(clubId);
    return djSet;
  }
}
