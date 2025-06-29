import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { VideoViewCreate } from '../models/video-view.model';
import { Observable } from 'rxjs';
import { DailyAggregation } from '../models/daily-aggregation.model';
import { TimePeriod } from '../util/dates';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiUrl = `${env.apiUrl}/views`;

  private currVideoId: number | null = null;
  private currTimeWatchedSeconds = 0;
  private hasIncremented = false;
  private lastUpdateTimestamp: number | null = null;

  private readonly minSecondsToWatch = 30;
  private readonly minPercentageToWatch = 0.5;

  constructor(private http: HttpClient, private authService: AuthService) {}

  tryIncrementingViews(videoId: number, videoDurationSeconds: number) {
    const now = Date.now();
  
    if (this.currVideoId !== videoId) {
      this.currVideoId = videoId;
      this.currTimeWatchedSeconds = 0;
      this.hasIncremented = false;
      this.lastUpdateTimestamp = null;
    }
  
    if (this.hasIncremented) return;
  
    if (this.lastUpdateTimestamp && now - this.lastUpdateTimestamp < 1000) return;

    this.currTimeWatchedSeconds++;
    this.lastUpdateTimestamp = now;

    const watchedPercentage = this.currTimeWatchedSeconds / videoDurationSeconds;

    if (this.currTimeWatchedSeconds < this.minSecondsToWatch && watchedPercentage < this.minPercentageToWatch) return;

    this.incrementViews(videoId);
  }

  private incrementViews(videoId: number) {
    const videoViewCreate: VideoViewCreate = {
      viewerId: this.authService.currentChannelId ?? undefined,
      videoId
    };

    this.http.post(`${this.apiUrl}/increment`, videoViewCreate).subscribe(() => {
      this.hasIncremented = true;
    });
  }

  reset() {
    this.currVideoId = null;
    this.currTimeWatchedSeconds = 0;
    this.hasIncremented = false;
    this.lastUpdateTimestamp = null;
  }

  getViewsByChannelPerDay(channelId: number, timePeriod: TimePeriod): Observable<DailyAggregation[]> {
    const start = new Date(), end = new Date();
    switch (timePeriod) {
      case 'last7Days':
        start.setDate(start.getDate() - 6);
        break;
      case 'last30Days':
        start.setDate(start.getDate() - 29);
        break;
      case 'last90Days':
        start.setDate(start.getDate() - 89);
        break;
    }

    const params = new HttpParams()
      .set('start', start.toISOString().split('T')[0])
      .set('end', end.toISOString().split('T')[0]);
    
    return this.http.get<DailyAggregation[]>(
      `${this.apiUrl}/count/${channelId}`,
      { params }
    );
  }
}