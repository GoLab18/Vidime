import { Injectable } from '@angular/core';
import { Video, VideoCreateInfo, VideoSlim } from '../models/video.model';
import { Observable } from 'rxjs';
import { env } from '../../environments/env';

import { HttpClient } from '@angular/common/http';
import { fetchSortString, SortOrder } from '../util/sorting';

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

  getChannelVideos(channelId: number, sortField: string, sortOrder: SortOrder): Observable<VideoSlim[]> {
    const sortParam = fetchSortString(sortField, sortOrder);
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/channel/${channelId}?${sortParam}`);
  }

  getAllVideos(sortField: string, sortOrder: SortOrder): Observable<VideoSlim[]> {
    const sortParam = fetchSortString(sortField, sortOrder);
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/all?${sortParam}`);
  }

  getMostWatchedVideosLastWeek(): Observable<VideoSlim[]> {
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/trending/week`);
  }
  
  getMostViewedVideosAllTime(): Observable<VideoSlim[]> {
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/trending`);
  }

  getBestRatedVideosLastWeek(): Observable<VideoSlim[]> {
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/best-rated/week`);
  }
  
  getBestRatedVideosAllTime(): Observable<VideoSlim[]> {
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/best-rated`);
  }

  createVideo(videoCreateInfo: VideoCreateInfo): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, videoCreateInfo);
  }

  // TODO related videos system
  getRelatedVideos(id: number): Observable<VideoSlim[]> {
    const sortParam = fetchSortString("addedAt", SortOrder.DESC);
    return this.http.get<VideoSlim[]>(`${this.apiUrl}/all?${sortParam}`);
  }
}
