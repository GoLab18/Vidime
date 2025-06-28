import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';
import { Subscription } from '../../models/subscription.model';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-video-watch-panel',
  imports: [CommonModule, VideoPlayerComponent, FormatNumberPipe, FormatDatePipe],
  templateUrl: './video-watch-panel.component.html',
  styleUrl: './video-watch-panel.component.css'
})
export class VideoWatchPanelComponent implements OnInit, OnChanges {
  @Input({required: true}) videoId!: number;

  video?: Video;
  subscription?: Subscription | null;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.loadVideo();
  }

  get isCurrentUsersVideo(): boolean {
    if (!this.video?.channel?.userId || !this.authService.currentUserId) return false;
    return this.video?.channel?.userId === this.authService.currentUserId;
  }

  get isSubscriptionAvailable(): boolean {
    return !this.isCurrentUsersVideo && !!this.authService.currentChannelId;
  }

  loadVideo() {
    this.videoService.getFullVideoById(this.videoId).pipe(
      switchMap(video => {
        this.video = video;

        if (this.isSubscriptionAvailable) {
          return this.subscriptionService.getCurrChannelSubscriptionTo(this.video!.channel!.id!);
        }

        return of(null);
      })
    ).subscribe(subscription => {
      this.subscription = subscription;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId']) this.loadVideo();
  }

  navigateToChannel(channelId: number, channelUuid: string) {
    this.router.navigate(['/channel'], { queryParams: { i: channelId, c: channelUuid } });
  }

  subscribeButtonInvoked() {
    this.subscriptionService.subscribeTo(this.video!.channel!.id!).subscribe(subscription => {
      this.subscription = subscription;
      this.video!.channel!.subscribersCount!++;
    });
  }

  unsubscribeButtonInvoked() {
    this.subscriptionService.unsubscribe(this.subscription!.id!).subscribe(() => {
      this.subscription = null;
      this.video!.channel!.subscribersCount!--;
    });
  }
}
