import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ChannelService } from '../../services/channel.service';
import { ViewService } from '../../services/view.service';
import { Channel } from '../../models/channel.model';
import { CustomLineChartComponent } from '../../components/custom-line-chart/custom-line-chart.component';
import { SubscriptionService } from '../../services/subscription.service';
import { VideoService } from '../../services/video.service';
import { StatsVideo } from '../../models/video.model';
import { StatsVideoComponent } from '../../components/stats-video/stats-video.component';
import { formatDate, TimePeriod } from '../../util/dates';

@Component({
  selector: 'app-channel-statistics',
  imports: [CommonModule, CustomLineChartComponent, StatsVideoComponent],
  templateUrl: './channel-statistics.component.html',
  styleUrl: './channel-statistics.component.css'
})
export class ChannelStatisticsComponent implements OnInit {
  currChannel: Channel | null = null;

  isOpen = false;
  timePeriod: TimePeriod = 'last7Days';
  timeOptions: { value: TimePeriod; label: string }[] = [
    { value: 'last7Days', label: 'Last 7 days' },
    { value: 'last30Days', label: 'Last 30 days' },
    { value: 'last90Days', label: 'Last 90 days' }
  ];

  viewsData: number[] = [];
  viewsLabels: string[] = [];
  isViewDataLoading = true;
  viewDataErr: string | null = null;

  subscriptionsData: number[] = [];
  subscriptionsLabels: string[] = [];
  isSubscriptionDataLoading = true;
  subscriptionDataErr: string | null = null;

  statVideosData: StatsVideo[] = [];
  isVideoDataLoading = true;
  videoDataErr: string | null = null;

  constructor(
    private authService: AuthService,
    private channelService: ChannelService,
    private viewService: ViewService,
    private subscriptionService: SubscriptionService,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    this.loadChannelData();
  }

  loadChannelData() {
    this.channelService.getChannel(this.authService.currentChannelId!).subscribe((channel: Channel) => {
      this.currChannel = channel;

      this.onDateRangeChange();
    });
  }

  onDateRangeChange() {
    this.loadViewStatistics();
    this.loadSubscriptionStatistics();
    this.loadVideoStatistics();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: TimePeriod) {
    this.isOpen = false;

    if (this.timePeriod === value) return;

    this.timePeriod = value;
    this.onDateRangeChange();
  }

  get selectedLabel(): string {
    return this.timeOptions.find(option => option.value === this.timePeriod)!.label;
  }

  loadViewStatistics() {
    this.isViewDataLoading = true;
    this.viewDataErr = null;
    
    this.viewService.getViewsByChannelPerDay(this.currChannel!.id!, this.timePeriod)
      .pipe(
        finalize(() => this.isViewDataLoading = false)
      )
      .subscribe({
        next: data => {
          this.viewsLabels = data.map(item => formatDate(item.date));
          this.viewsData = data.map(item => item.data);
        },
        error: _ => {
          this.viewDataErr = 'View statistics loading failed. Please try again later.';
          this.viewsLabels = [];
          this.viewsData = [];
        }
      });
  }

  loadSubscriptionStatistics() {
    this.isSubscriptionDataLoading = true;
    this.subscriptionDataErr = null;
    
    this.subscriptionService.getSubscriptionsByChannelPerDay(this.currChannel!.id!, this.timePeriod)
      .pipe(
        finalize(() => this.isSubscriptionDataLoading = false)
      )
      .subscribe({
        next: data => {
          this.subscriptionsLabels = data.map(item => formatDate(item.date));
          this.subscriptionsData = data.map(item => item.data);
        },
        error: _ => {
          this.subscriptionDataErr = 'Subscription statistics loading failed. Please try again later.';
          this.subscriptionsLabels = [];
          this.subscriptionsData = [];
        }
      });
  }

  loadVideoStatistics() {
    this.isVideoDataLoading = true;
    this.videoDataErr = null;
    
    this.videoService.getStatsVideos(this.currChannel!.id!, this.timePeriod)
      .pipe(
        finalize(() => this.isVideoDataLoading = false)
      )
      .subscribe({
        next: data => {
          this.statVideosData = data;
        },
        error: _ => {
          this.videoDataErr = 'Video statistics loading failed. Please try again later.';
          this.statVideosData = [];
        }
      });
  }
}
