import { Injectable } from '@angular/core';
import { Channel } from '../models/channel.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

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

  getChannel(id: number): Observable<Channel> {
    let channel = this.mockChannels.find(c => c.id === id);
    return of(channel!).pipe(delay(1000));
  }

  getChannels(): Observable<Channel[]> {
    return of(this.mockChannels).pipe(delay(1000));
  }
}
