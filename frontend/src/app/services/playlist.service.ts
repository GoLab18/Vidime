import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../models/playlist.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor(private httpClient: HttpClient) {}

  private mockPlaylists: Playlist[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614175023',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'NewYorkBros',
        picture: 'https://picsum.photos/1600/900',
        description: 'Welcome to NY Bros! We create amazing content about technology, programming, and digital trends. Subscribe for weekly updates and exclusive content.',
        userId: 1,
        videosAmount: 42,
        subscribersCount: 1500,
        verified: true,
        createdAt: new Date().toISOString()
      },
      title: 'Funny',
      description: 'Funny videos, i am super funny so',
      thumbnailUrl: 'https://picsum.photos/100/100?1',
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
        picture: 'https://picsum.photos/1600/900',
        description: 'Welcome to NY Bros! We create amazing content about technology, programming, and digital trends. Subscribe for weekly updates and exclusive content.',
        userId: 1,
        videosAmount: 42,
        subscribersCount: 1500,
        verified: true,
        createdAt: new Date().toISOString()
      },
      title: 'Automation',
      description: 'Automation theory',
      thumbnailUrl: 'https://picsum.photos/100/100?1',
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
        picture: 'https://picsum.photos/1600/900',
        description: 'Welcome to NY Bros! We create amazing content about technology, programming, and digital trends. Subscribe for weekly updates and exclusive content.',
        userId: 1,
        videosAmount: 42,
        subscribersCount: 1500,
        verified: true,
        createdAt: new Date().toISOString()
      },
      title: 'RandomMusic',
      description: 'DUBSTEP',
      thumbnailUrl: 'https://picsum.photos/100/100?1',
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
        picture: 'https://picsum.photos/1600/900',
        description: 'Welcome to NY Bros! We create amazing content about technology, programming, and digital trends. Subscribe for weekly updates and exclusive content.',
        userId: 1,
        videosAmount: 42,
        subscribersCount: 1500,
        verified: true,
        createdAt: new Date().toISOString()
      },
      title: 'LongVids',
      description: 'Longest videos you will ever see',
      thumbnailUrl: 'https://picsum.photos/100/100?1',
      isPublic: true,
      videoCount: 14,
      createdAt: new Date(2022, 5, 21).toISOString()
    }
  ];

  getChannelPlaylists(channelId: number) {
    return of(this.mockPlaylists.filter(p => {
      let isTaken = p.channel?.id === 101;
      // p.channel = undefined;
      return isTaken;
    })).pipe(delay(500));
  }
}
