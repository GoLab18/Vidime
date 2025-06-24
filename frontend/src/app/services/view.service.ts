import { Injectable } from '@angular/core';
import { env } from '../../environments/env';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { VideoViewCreate } from '../models/video-view.model';

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
}