import { Injectable } from '@angular/core';
import { Video, VideoCreateInfo, VideoSlim } from '../models/video.model';
import { delay, Observable, of } from 'rxjs';
import { env } from '../../environments/env';

import { HttpClient } from '@angular/common/http';
import { fetchSortString, SortOrder } from '../util/sorting';

export enum SortStrategy {
  NEWEST,
  OLDEST,
  MOST_VIEWED,
  LEAST_VIEWED,
  BEST_RATED,
  WORST_RATED,
  MOST_RATED,
  LEAST_RATED
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = `${env.apiUrl}/videos`;

  constructor(private http: HttpClient) {}

  getFullVideoById(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/id/${id}`);
  }

  getFullVideoByUuid(uuid: string): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/uuid/${uuid}`);
  }

  private mockVideos: VideoSlim[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
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
      tags: [
        { id: 1, name: 'Nature' },
        { id: 2, name: 'Documentary' }
      ],
      title: 'Amazing Nature Documentary',
      thumbnailUrl: 'https://picsum.photos/300/200',
      duration: 750000,
      views: 125000,
      addedAt: new Date('2024-04-12T14:20:00Z').toISOString()
    },
    {
      id: 2,
      uuid: '123e4567-e89b-12d3-a456-426614174001',
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
      tags: [
        { id: 3, name: 'Tech' },
        { id: 4, name: 'Review' }
      ],
      title: 'Tech Review: Latest Gadgets 2025',
      thumbnailUrl: 'https://picsum.photos/300/200?random=1',
      duration: 525000,
      views: 89120,
      addedAt: new Date().toISOString()
    },
    {
      id: 3,
      uuid: '123e4567-e89b-12d3-a456-426614174002',
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
      tags: [
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Food' }
      ],
      title: 'Cooking Masterclass: Italian Cuisine for Beginners',
      thumbnailUrl: 'https://picsum.photos/300/200?random=2',
      duration: 920000,
      views: 311760,
      addedAt: new Date('2024-07-22T17:45:00Z').toISOString()
    },
    {
      id: 4,
      uuid: '123e4567-e89b-12d3-a456-426614174003',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174003',
        name: 'AdventureVibes',
        picture: 'https://picsum.photos/50/50?random=3',
        description: 'Extreme sports and adventure travel around the world.',
        userId: 4,
        videosAmount: 2,
        subscribersCount: 3200,
        verified: true,
        createdAt: new Date('2021-08-12T16:40:00Z').toISOString(),
      },
      tags: [
        { id: 7, name: 'Adventure' },
        { id: 8, name: 'Sports' }
      ],
      title: 'Skydiving from 15,000ft!',
      thumbnailUrl: 'https://picsum.photos/300/200?random=3',
      duration: 500000,
      views: 70210,
      addedAt: new Date('2024-03-02T19:00:00Z').toISOString()
    },
    {
      id: 5,
      uuid: '123e4567-e89b-12d3-a456-426614174004',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174004',
        name: 'WorldCuisine',
        picture: 'https://picsum.photos/50/50?random=4',
        description: 'A journey through food from every continent.',
        userId: 5,
        videosAmount: 2,
        subscribersCount: 4500,
        verified: false,
        createdAt: new Date('2021-06-20T08:00:00Z').toISOString(),
      },
      tags: [
        { id: 9, name: 'Food' },
        { id: 10, name: 'Cuisine' }
      ],
      title: 'Sushi Making Tutorial: Authentic Japanese Recipes',
      thumbnailUrl: 'https://picsum.photos/300/200?random=4',
      duration: 600000,
      views: 451000,
      addedAt: new Date('2024-05-10T11:00:00Z').toISOString()
    },
    {
      id: 6,
      uuid: '123e4567-e89b-12d3-a456-426614174005',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174005',
        name: 'SpaceScience',
        picture: 'https://picsum.photos/50/50?random=5',
        description: 'Exploring the universe and scientific discoveries.',
        userId: 6,
        videosAmount: 4,
        subscribersCount: 8000,
        verified: true,
        createdAt: new Date('2020-12-11T17:45:00Z').toISOString(),
      },
      tags: [
        { id: 11, name: 'Science' },
        { id: 12, name: 'Space' }
      ],
      title: 'Mars Mission: Journey to the Red Planet',
      thumbnailUrl: 'https://picsum.photos/300/200?random=5',
      duration: 1150000,
      views: 205000,
      addedAt: new Date('2024-02-15T10:30:00Z').toISOString()
    },
    {
      id: 7,
      uuid: '123e4567-e89b-12d3-a456-426614174006',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174006',
        name: 'MusicMasters',
        picture: 'https://picsum.photos/50/50?random=6',
        description: 'Discover new music and iconic performances.',
        userId: 7,
        videosAmount: 1,
        subscribersCount: 12000,
        verified: true,
        createdAt: new Date('2019-02-08T14:30:00Z').toISOString(),
      },
      tags: [
        { id: 13, name: 'Music' },
        { id: 14, name: 'Performance' }
      ],
      title: 'Live Concert: The Ultimate Rock Show',
      thumbnailUrl: 'https://picsum.photos/300/200?random=6',
      duration: 1300000,
      views: 730000,
      addedAt: new Date('2024-03-25T12:00:00Z').toISOString()
    },
    {
      id: 8,
      uuid: '123e4567-e89b-12d3-a456-426614174007',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174007',
        name: 'FitnessFreaks',
        picture: 'https://picsum.photos/50/50?random=7',
        description: 'Get fit with workout routines, health tips, and motivation.',
        userId: 8,
        videosAmount: 1,
        subscribersCount: 9500,
        verified: true,
        createdAt: new Date('2020-07-10T08:00:00Z').toISOString(),
      },
      tags: [
        { id: 15, name: 'Fitness' },
        { id: 16, name: 'Health' }
      ],
      title: 'HIIT Workout: Burn Fat Fast!',
      thumbnailUrl: 'https://picsum.photos/300/200?random=7',
      duration: 600000,
      views: 120000,
      addedAt: new Date('2024-04-01T09:00:00Z').toISOString()
    },
    {
      id: 9,
      uuid: '123e4567-e89b-12d3-a456-426614174008',
      channel: {
        id: 101,
        uuid: '123e4567-e89b-12d3-a456-426614174008',
        name: 'EcoTech',
        picture: 'https://picsum.photos/50/50?random=8',
        description: 'Innovative solutions for sustainability and technology.',
        userId: 9,
        videosAmount: 3,
        subscribersCount: 6000,
        verified: true,
        createdAt: new Date('2021-04-02T15:45:00Z').toISOString(),
      },
      tags: [
        { id: 17, name: 'Tech' },
        { id: 18, name: 'Sustainability' }
      ],
      title: 'Green Tech: Solar Energy Innovations',
      thumbnailUrl: 'https://picsum.photos/300/200?random=8',
      duration: 57000,
      views: 485000,
      addedAt: new Date('2024-05-08T13:00:00Z').toISOString()
    }
  ];

  private mockVideosNoChannels: VideoSlim[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      channel: undefined,
      tags: [
        { id: 1, name: 'Nature' },
        { id: 2, name: 'Documentary' }
      ],
      title: 'Amazing Nature Documentary',
      thumbnailUrl: 'https://picsum.photos/300/200',
      duration: 750000,
      views: 125000,
      addedAt: new Date('2024-04-12T14:20:00Z').toISOString()
    },
    {
      id: 2,
      uuid: '123e4567-e89b-12d3-a456-426614174001',
      channel: undefined,
      tags: [
        { id: 3, name: 'Tech' },
        { id: 4, name: 'Review' }
      ],
      title: 'Tech Review: Latest Gadgets 2025',
      thumbnailUrl: 'https://picsum.photos/300/200?random=1',
      duration: 525000,
      views: 89120,
      addedAt: new Date().toISOString()
    },
    {
      id: 3,
      uuid: '123e4567-e89b-12d3-a456-426614174002',
      channel: undefined,
      tags: [
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Food' }
      ],
      title: 'Cooking Masterclass: Italian Cuisine for Beginners',
      thumbnailUrl: 'https://picsum.photos/300/200?random=2',
      duration: 920000,
      views: 311760,
      addedAt: new Date('2024-07-22T17:45:00Z').toISOString()
    },
    {
      id: 4,
      uuid: '123e4567-e89b-12d3-a456-426614174003',
      channel: undefined,
      tags: [
        { id: 7, name: 'Adventure' },
        { id: 8, name: 'Sports' }
      ],
      title: 'Skydiving from 15,000ft!',
      thumbnailUrl: 'https://picsum.photos/300/200?random=3',
      duration: 500000,
      views: 70210,
      addedAt: new Date('2024-03-02T19:00:00Z').toISOString()
    },
    {
      id: 5,
      uuid: '123e4567-e89b-12d3-a456-426614174004',
      channel: undefined,
      tags: [
        { id: 9, name: 'Food' },
        { id: 10, name: 'Cuisine' }
      ],
      title: 'Sushi Making Tutorial: Authentic Japanese Recipes',
      thumbnailUrl: 'https://picsum.photos/300/200?random=4',
      duration: 600000,
      views: 451000,
      addedAt: new Date('2024-05-10T11:00:00Z').toISOString()
    },
    {
      id: 6,
      uuid: '123e4567-e89b-12d3-a456-426614174005',
      channel: undefined,
      tags: [
        { id: 11, name: 'Science' },
        { id: 12, name: 'Space' }
      ],
      title: 'Mars Mission: Journey to the Red Planet',
      thumbnailUrl: 'https://picsum.photos/300/200?random=5',
      duration: 1150000,
      views: 205000,
      addedAt: new Date('2024-02-15T10:30:00Z').toISOString()
    },
    {
      id: 7,
      uuid: '123e4567-e89b-12d3-a456-426614174006',
      channel: undefined,
      tags: [
        { id: 13, name: 'Music' },
        { id: 14, name: 'Performance' }
      ],
      title: 'Live Concert: The Ultimate Rock Show',
      thumbnailUrl: 'https://picsum.photos/300/200?random=6',
      duration: 1300000,
      views: 730000,
      addedAt: new Date('2024-03-25T12:00:00Z').toISOString()
    },
    {
      id: 8,
      uuid: '123e4567-e89b-12d3-a456-426614174007',
      channel: undefined,
      tags: [
        { id: 15, name: 'Fitness' },
        { id: 16, name: 'Health' }
      ],
      title: 'HIIT Workout: Burn Fat Fast!',
      thumbnailUrl: 'https://picsum.photos/300/200?random=7',
      duration: 600000,
      views: 120000,
      addedAt: new Date('2024-04-01T09:00:00Z').toISOString()
    },
    {
      id: 9,
      uuid: '123e4567-e89b-12d3-a456-426614174008',
      channel: undefined,
      tags: [
        { id: 17, name: 'Tech' },
        { id: 18, name: 'Sustainability' }
      ],
      title: 'Green Tech: Solar Energy Innovations',
      thumbnailUrl: 'https://picsum.photos/300/200?random=8',
      duration: 57000,
      views: 485000,
      addedAt: new Date('2024-05-08T13:00:00Z').toISOString()
    }
  ];

  getRelatedVideos(id: number): Observable<VideoSlim[]> {
    return of(this.mockVideos.filter(v => v.id !== id)).pipe(delay(500));
  }

  getTrendingVideos(): Observable<VideoSlim[]> {
    const sortedVideos = [...this.mockVideos].sort((a, b) => b.views - a.views);
    return of(sortedVideos).pipe(delay(500));
  }

  getChannelVideos(sortStrategy: SortStrategy): Observable<VideoSlim[]> {
    switch (sortStrategy) {
      case SortStrategy.NEWEST:
        return of(this.mockVideosNoChannels.sort((a, b) => b.addedAt.localeCompare(a.addedAt))).pipe(delay(500));
      case SortStrategy.OLDEST:
        return of(this.mockVideosNoChannels.sort((a, b) => a.addedAt.localeCompare(b.addedAt))).pipe(delay(500));
      case SortStrategy.MOST_VIEWED:
        return of(this.mockVideosNoChannels.sort((a, b) => b.views - a.views)).pipe(delay(500));
      case SortStrategy.LEAST_VIEWED:
        return of(this.mockVideosNoChannels.sort((a, b) => a.views - b.views)).pipe(delay(500));
      default:
        return of(this.mockVideosNoChannels).pipe(delay(500));
    }
  }

  getAllVideos(sortField: string, sortOrder: SortOrder): Observable<VideoSlim[]> {
    const sortParam = fetchSortString(sortField, sortOrder);
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/all?${sortParam}`);
  }

  createVideo(videoCreateInfo: VideoCreateInfo): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, videoCreateInfo);
  }
}
