import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}

  private mockVideos: Video[] = [
    {
      id: 1,
      uuid: '123e4567-e89b-12d3-a456-426614174000',
      channel: {
        id: 1,
        uuid: '123e4567-e89b-12d3-a456-426614174000',
        name: 'NatureExplorer',
        picture: 'https://picsum.photos/50/50',
        description: 'Explore the wonders of nature and wildlife.',
        userId: 1,
        videosAmount: 3,
        subscribersCount: 7,
        verified: true,
        createdAt: new Date('2023-06-15T10:00:00Z').toISOString(),
      },
      tags: [
        { id: 1, name: 'Nature' },
        { id: 2, name: 'Documentary' }
      ],
      title: 'Amazing Nature Documentary',
      description: 'An immersive journey through Earth’s most beautiful landscapes.',
      cdnUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200',
      duration: 750,
      views: 125000,
      ratings: 1500,
      avgRating: 4.7,
      addedAt: new Date('2024-04-12T14:20:00Z').toISOString()
    },
    {
      id: 2,
      uuid: '123e4567-e89b-12d3-a456-426614174001',
      channel: {
        id: 2,
        uuid: '123e4567-e89b-12d3-a456-426614174001',
        name: 'TechInsider',
        picture: 'https://picsum.photos/50/50?random=1',
        description: 'Latest reviews and news in tech.',
        userId: 2,
        videosAmount: 1,
        subscribersCount: 1000,
        verified: true,
        createdAt: new Date('2022-11-03T09:15:00Z').toISOString(),
      },
      tags: [
        { id: 3, name: 'Tech' },
        { id: 4, name: 'Review' }
      ],
      title: 'Tech Review: Latest Gadgets 2025',
      description: 'Hands-on review of this year’s hottest gadgets.',
      cdnUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=1',
      duration: 525,
      views: 89120,
      ratings: 800,
      avgRating: 4.2,
      addedAt: new Date().toISOString()
    },
    {
      id: 3,
      uuid: '123e4567-e89b-12d3-a456-426614174002',
      channel: {
        id: 3,
        uuid: '123e4567-e89b-12d3-a456-426614174002',
        name: 'ChefLife',
        picture: 'https://picsum.photos/50/50?random=2',
        description: 'Delicious recipes and cooking tips from chefs.',
        userId: 3,
        videosAmount: 1,
        subscribersCount: 500,
        verified: false,
        createdAt: new Date('2023-03-10T12:30:00Z').toISOString(),
      },
      tags: [
        { id: 5, name: 'Cooking' },
        { id: 6, name: 'Food' }
      ],
      title: 'Cooking Masterclass: Italian Cuisine',
      description: 'Learn how to prepare authentic Italian dishes.',
      cdnUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=2',
      duration: 920,
      views: 311760,
      ratings: 250,
      avgRating: 4.8,
      addedAt: new Date('2024-07-22T17:45:00Z').toISOString()
    },
    {
      id: 4,
      uuid: '123e4567-e89b-12d3-a456-426614174003',
      channel: {
        id: 4,
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
      description: 'An adrenaline-packed skydiving experience.',
      cdnUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=3',
      duration: 500,
      views: 70210,
      ratings: 150,
      avgRating: 4.9,
      addedAt: new Date('2024-03-02T19:00:00Z').toISOString()
    },
    {
      id: 5,
      uuid: '123e4567-e89b-12d3-a456-426614174004',
      channel: {
        id: 5,
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
      description: 'Learn how to make delicious sushi at home!',
      cdnUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=4',
      duration: 600,
      views: 451000,
      ratings: 1200,
      avgRating: 4.5,
      addedAt: new Date('2024-05-10T11:00:00Z').toISOString()
    },
    {
      id: 6,
      uuid: '123e4567-e89b-12d3-a456-426614174005',
      channel: {
        id: 6,
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
      description: 'Follow the latest mission to Mars.',
      cdnUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=5',
      duration: 1150,
      views: 205000,
      ratings: 3000,
      avgRating: 4.9,
      addedAt: new Date('2024-02-15T10:30:00Z').toISOString()
    },
    {
      id: 7,
      uuid: '123e4567-e89b-12d3-a456-426614174006',
      channel: {
        id: 7,
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
      description: 'A live performance from the best rock band of the year!',
      cdnUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=6',
      duration: 1300,
      views: 730000,
      ratings: 5000,
      avgRating: 4.8,
      addedAt: new Date('2024-03-25T12:00:00Z').toISOString()
    },
    {
      id: 8,
      uuid: '123e4567-e89b-12d3-a456-426614174007',
      channel: {
        id: 8,
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
      description: 'A quick, high-intensity workout to get you in shape.',
      cdnUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=7',
      duration: 600,
      views: 120000,
      ratings: 700,
      avgRating: 4.6,
      addedAt: new Date('2024-04-01T09:00:00Z').toISOString()
    },
    {
      id: 9,
      uuid: '123e4567-e89b-12d3-a456-426614174008',
      channel: {
        id: 9,
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
      description: 'Explore the latest in solar energy technology.',
      cdnUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
      thumbnailUrl: 'https://picsum.photos/300/200?random=8',
      duration: 57,
      views: 485000,
      ratings: 2300,
      avgRating: 4.4,
      addedAt: new Date('2024-05-08T13:00:00Z').toISOString()
    }
  ];

  getVideos(): Observable<Video[]> {
    return of(this.mockVideos).pipe(delay(500));
  }

  getVideo(id: number): Observable<Video> {
    return of(this.mockVideos.find(v => v.id === id)!).pipe(delay(500));
  }

  getRelatedVideos(id: number): Observable<Video[]> {
    return of(this.mockVideos.filter(v => v.id !== id)).pipe(delay(500));
  }
}
