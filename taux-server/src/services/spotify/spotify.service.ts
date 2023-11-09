import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';
import { ApiCredential, ApiCredentialProvider } from '../../models/entities/apiCredential.entity';

@Injectable()
export class SpotifyService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @InjectRepository(ApiCredential) private credentialRepository: Repository<ApiCredential>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  private tokenPrefix: string = 'credentials:spotify';
  private serviceToken: string;
  private tokenExpiration: number;

  async refreshToken(): Promise<void> {
    const clientId: string =
      this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const secret: string = this.configService.get<string>(
      'SPOTIFY_CLIENT_SECRET',
    );
    const spotifyTokenUrl: string = 'https://accounts.spotify.com/api/token';
    const tokenDetail: string = `grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`;
    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    const data = await lastValueFrom(
      this.httpService.post(spotifyTokenUrl, tokenDetail, options).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'An error happened!';
        }),
        map((resp) => resp.data),
      ),
    );
    console.log(data);
    const ttl: number = data.expires_in;
    await this.cacheService.set(this.tokenPrefix, data.access_token, 3600 )
  }

  async getPlaylist(playlistId: string): Promise<object> {
    const now: Date = new Date();
    const existingToken: string = await this.cacheService.get(this.tokenPrefix)
    console.log(existingToken);
    if (!existingToken) {
      await this.refreshToken();
    }
    const playlistUrl: string = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${existingToken}`,
      },
    };
    const data = await lastValueFrom(
      this.httpService.get(playlistUrl, options).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'An error happened!';
        }),
        map((resp) => resp.data),
      ),
    );
    return data;
  }

  async getArtist(artistId: string): Promise<object> {
    const now: Date = new Date();
    if (!this.serviceToken || now.getSeconds() < this.tokenExpiration) {
      await this.refreshToken();
    }
    const artistUrl: string = `https://api.spotify.com/v1/artists/${artistId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.serviceToken}`,
      },
    };
    const data = await lastValueFrom(
      this.httpService.get(artistUrl, options).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
        map((resp) => resp.data),
      ),
    );
    return data;
  }

  async getTrack(trackId: string): Promise<object> {
    const now: Date = new Date();
    if (!this.serviceToken || now.getSeconds() < this.tokenExpiration) {
      await this.refreshToken();
    }
    const trackUrl: string = `https://api.spotify.com/v1/tracks/${trackId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.serviceToken}`,
      },
    };
    const data = await lastValueFrom(
      this.httpService.get(trackUrl, options).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
        map((resp) => resp.data),
      ),
    );
    return data;
  }

  async getTrackFeatures(trackId: string): Promise<object> {
    const now: Date = new Date();
    if (!this.serviceToken || now.getSeconds() < this.tokenExpiration) {
      await this.refreshToken();
    }
    const featuresUrl: string = `https://api.spotify.com/v1/audio-features/${trackId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.serviceToken}`,
      },
    };
    const data = await lastValueFrom(
      this.httpService.get(featuresUrl, options).pipe(
        catchError((error: AxiosError) => {
          throw 'An error happened!';
        }),
        map((resp) => resp.data),
      ),
    );
    return data;
  }
}
