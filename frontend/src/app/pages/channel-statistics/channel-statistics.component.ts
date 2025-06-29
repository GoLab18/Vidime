import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ChannelService } from '../../services/channel.service';
import { ViewService } from '../../services/view.service';
import { Channel } from '../../models/channel.model';
import { DailyAggregation } from '../../models/daily-aggregation.model';
import { CustomLineChartComponent } from '../../components/custom-line-chart/custom-line-chart.component';

@Component({
  selector: 'app-channel-statistics',
  imports: [CommonModule, CustomLineChartComponent],
  templateUrl: './channel-statistics.component.html',
  styleUrl: './channel-statistics.component.css'
})
export class ChannelStatisticsComponent implements OnInit {
  currChannel: Channel | null = null;

  viewsData: number[] = [];
  viewsLabels: string[] = [];
  isViewDataLoading = true;
  viewDataErr: string | null = null;

  subscriptionsData: number[] = [];
  subscriptionsLabels: string[] = [];
  isSubscriptionDataLoading = true;
  subscriptionDataErr: string | null = null;

  constructor(
    private authService: AuthService,
    private channelService: ChannelService,
    private viewService: ViewService
  ) {}

  ngOnInit() {
    this.loadChannelData();
  }

  loadChannelData() {
    this.channelService.getChannel(this.authService.currentChannelId!).subscribe((channel: Channel) => {
        this.currChannel = channel;
        this.loadViewStatistics();
        this.loadSubscriptionStatistics();
      });
  }

  loadViewStatistics(timePeriod: 'last7Days' | 'last30Days' | 'last90Days' = 'last7Days') {
    this.isViewDataLoading = true;
    this.viewDataErr = null;
    
    this.viewService.getViewsByChannelPerDay(this.currChannel!.id!, timePeriod)
      .pipe(
        finalize(() => this.isViewDataLoading = false)
      )
      .subscribe({
        next: data => {
          this.viewsLabels = data.map(item => this.formatDate(item.date));
          this.viewsData = data.map(item => item.data);
        },
        error: _ => {
          this.viewDataErr = 'Failed to load view statistics. Please try again later.';
          this.viewsLabels = [];
          this.viewsData = [];
        }
      });
  }

  loadSubscriptionStatistics(timePeriod: 'last7Days' | 'last30Days' | 'last90Days' = 'last7Days') {
    this.isSubscriptionDataLoading = true;
    this.subscriptionDataErr = null;
    
    this.viewService.getViewsByChannelPerDay(this.currChannel!.id!, timePeriod)
      .pipe(
        finalize(() => this.isSubscriptionDataLoading = false)
      )
      .subscribe({
        next: data => {
          this.subscriptionsLabels = data.map(item => this.formatDate(item.date));
          this.subscriptionsData = data.map(item => item.data);
        },
        error: _ => {
          this.subscriptionDataErr = 'Failed to load subscription statistics. Please try again later.';
          this.subscriptionsLabels = [];
          this.subscriptionsData = [];
        }
      });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short', 
      day: 'numeric',
      timeZone: 'UTC'
    });
  }
}
