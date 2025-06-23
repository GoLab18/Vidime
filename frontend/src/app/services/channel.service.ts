import { Injectable } from '@angular/core';
import { Channel, ChannelTrending } from '../models/channel.model';
import { Observable } from 'rxjs';
import { env } from '../../environments/env';
import { HttpClient } from '@angular/common/http';
import { ChannelLink } from '../models/channel-link.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  constructor(private http: HttpClient) {}

  getChannel(id: number): Observable<Channel> {
    return this.http.get<Channel>(`${env.apiUrl}/channels/id/${id}`);
  }

  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(`${env.apiUrl}/channels`);
  }

  getMostSubsChannelsAllTime() {
    return this.http.get<ChannelTrending[]>(`${env.apiUrl}/channels/most-subscribed`);
  }
  getMostViewedChannelsAllTime() {
    return this.http.get<ChannelTrending[]>(`${env.apiUrl}/channels/most-viewed`);
  }
  getMostViewedChannelsLastWeek() {
    return this.http.get<ChannelTrending[]>(`${env.apiUrl}/channels/most-viewed/week`);
  }

  getLinks(channelId: number): Observable<ChannelLink[]> {
    return this.http.get<ChannelLink[]>(`${env.apiUrl}/channel-links/channel/${channelId}`);
  }
}
