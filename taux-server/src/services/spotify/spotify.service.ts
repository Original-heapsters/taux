import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, map, lastValueFrom } from 'rxjs';

@Injectable()
export class SpotifyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
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
          throw 'An error happened!';
        }),
        map((resp) => resp.data),
      ),
    );
    const token: string = data.access_token;
    const expiration: Date = new Date();
    expiration.setSeconds(expiration.getSeconds() + data.expires_in);
    this.serviceToken = token;
    this.tokenExpiration = expiration.getSeconds();
  }

  async getPlaylist(playlistId: string): Promise<object> {
    const now: Date = new Date();
    if (!this.serviceToken || now.getSeconds() < this.tokenExpiration) {
      await this.refreshToken();
    }
    const playlistUrl: string = `https://api.spotify.com/v1/playlists/${playlistId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${this.serviceToken}`,
      },
    };
    const data = await lastValueFrom(
      this.httpService.get(playlistUrl, options).pipe(
        catchError((error: AxiosError) => {
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
