import { Injectable } from '@angular/core';
import { Channel } from '../models/channel.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ChannelLink } from '../models/channel-link.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private httpClient: HttpClient) {}

  private mockChannels: Channel[] = [
    {
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
    }
  ];

  private mockLinks: ChannelLink[] = [
    {
      id: 1,
      channelId: 101,
      title: 'Discord',
      url: 'https://discord.gg/nybros',
      position: 1
    },
    {
      id: 2,
      channelId: 101,
      title: 'Twitter',
      url: 'https://twitter.com/nybros',
      position: 2
    },
    {
      id: 3,
      channelId: 101,
      title: 'Instagram',
      url: 'https://instagram.com/nybros',
      position: 3
    },
    {
      id: 4,
      channelId: 101,
      title: 'TikTok',
      url: 'https://tiktok.com/nybros',
      position: 4
    }
  ];

  getChannel(id: number): Observable<Channel> {
    let channel = this.mockChannels.find(c => c.id === id);
    return of(channel!).pipe(delay(500));
  }

  getChannels(): Observable<Channel[]> {
    return of(this.mockChannels).pipe(delay(500));
  }

  getLinks(channelId: number): Observable<ChannelLink[]> {
    return of(this.mockLinks.filter(l => l.channelId === 101)).pipe(delay(500));
  }
}
