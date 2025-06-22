import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../models/playlist.model';
import { env } from '../../environments/env';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = `${env.apiUrl}/playlists`;
  constructor(private httpClient: HttpClient) {}

  getPlaylistsByChannelId(channelId: number): Observable<Playlist[]> {
    return this.httpClient.get<Playlist[]>(`${this.apiUrl}/channel/${channelId}`);
  }

  private mockPlaylistsWithChannels: Playlist[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614175023',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'NewYorkBros',
        picture: 'https://picsum.photos/1600/900?random=1',
        userId: 6,
        verified: true
      },
      title: 'Funny',
      description: 'Funny videos, i am super funny so',
      thumbnailUrl: 'https://picsum.photos/300/200?random=1',
      isPublic: false,
      videoCount: 2,
      createdAt: new Date(2022, 5, 8).toISOString()
    },
    {
      id: 2,
      uuid: '123e4567-e89b-12d3-a456-426614175024',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'NewYorkBros',
        picture: 'https://picsum.photos/1600/900?random=2',
        userId: 6,
        verified: true
      },
      title: 'Automation',
      description: 'Automation theory',
      thumbnailUrl: 'https://picsum.photos/300/200?random=2',
      isPublic: false,
      videoCount: 1,
      createdAt: new Date(2023, 1, 12).toISOString()
    },
    {
      id: 3,
      uuid: '123e4567-e89b-12d3-a456-426614175025',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'NewYorkBros',
        picture: 'https://picsum.photos/1600/900?random=3',
        userId: 6,
        verified: true
      },
      title: 'RandomMusic',
      description: 'DUBSTEP',
      thumbnailUrl: 'https://picsum.photos/300/200?random=3',
      isPublic: true,
      videoCount: 1,
      createdAt: new Date(2022, 3, 15).toISOString()
    },
    {
      id: 4,
      uuid: '123e4567-e89b-12d3-a456-426614175026',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'NewYorkBros',
        picture: 'https://picsum.photos/1600/900?random=4',
        userId: 6,
        verified: true
      },
      title: 'LongVids',
      description: 'Longest videos you will ever see',
      thumbnailUrl: 'https://picsum.photos/300/200?random=4',
      isPublic: true,
      videoCount: 14,
      createdAt: new Date(2022, 5, 21).toISOString()
    }
  ];

  private mockPlaylists: Playlist[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614175023',
      channel: undefined,
      title: 'Funny',
      description: 'Funny videos, i am super funny so',
      thumbnailUrl: 'https://picsum.photos/300/200?random=1',
      isPublic: false,
      videoCount: 2,
      createdAt: new Date(2022, 5, 8).toISOString()
    },
    {
      id: 2,
      uuid: '123e4567-e89b-12d3-a456-426614175024',
      channel: undefined,
      title: 'Automation',
      description: 'Automation theory',
      thumbnailUrl: 'https://picsum.photos/300/200?random=2',
      isPublic: false,
      videoCount: 1,
      createdAt: new Date(2023, 1, 12).toISOString()
    },
    {
      id: 3,
      uuid: '123e4567-e89b-12d3-a456-426614175025',
      channel: undefined,
      title: 'RandomMusic',
      description: 'DUBSTEP',
      thumbnailUrl: 'https://picsum.photos/300/200?random=3',
      isPublic: true,
      videoCount: 1,
      createdAt: new Date(2022, 3, 15).toISOString()
    },
    {
      id: 4,
      uuid: '123e4567-e89b-12d3-a456-426614175026',
      channel: undefined,
      title: 'LongVids',
      description: 'Longest videos you will ever see',
      thumbnailUrl: 'https://picsum.photos/300/200?random=4',
      isPublic: true,
      videoCount: 14,
      createdAt: new Date(2022, 5, 21).toISOString()
    }
  ];

  getChannelPlaylists(channelId: number) {
    return of(this.mockPlaylists).pipe(delay(500));
  }
}
