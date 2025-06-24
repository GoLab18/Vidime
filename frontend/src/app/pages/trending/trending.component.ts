import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoSlim } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { HorizontalGroupScrollComponent } from '../../components/horizontal-group-scroll/horizontal-group-scroll.component';
import { ChannelTrending } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { HorizontalChannelListComponent } from '../../components/horizontal-channel-list/horizontal-channel-list.component';

@Component({
  selector: 'app-trending',
  imports: [CommonModule, HorizontalGroupScrollComponent, HorizontalChannelListComponent],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent implements OnInit {
  mostSubsChannelsAllTime: ChannelTrending[] = [];
  mostViewedChannelsAllTime: ChannelTrending[] = [];
  mostViewedChannelsLastWeek: ChannelTrending[] = [];
  mostViewedVideosAllTime: VideoSlim[] = [];
  mostViewedVideosLastWeek: VideoSlim[] = [];
  bestRatedVideosAllTime: VideoSlim[] = [];
  bestRatedVideosLastWeek: VideoSlim[] = [];
  channelsFirstLoad: boolean = true;
  showChannels: boolean = false;

  constructor(private videoService: VideoService, private channelService: ChannelService) {}

  ngOnInit() {
    this.videoService.getMostViewedVideosAllTime().subscribe(data => {
      this.mostViewedVideosAllTime = data;
    });

    this.videoService.getMostWatchedVideosLastWeek().subscribe(data => {
      this.mostViewedVideosLastWeek = data;
    });

    this.videoService.getBestRatedVideosAllTime().subscribe(data => {
      this.bestRatedVideosAllTime = data;
    });

    this.videoService.getBestRatedVideosLastWeek().subscribe(data => {
      this.bestRatedVideosLastWeek = data;
    });
  }

  toggleChannels() {
    if (this.channelsFirstLoad) {
      this.channelService.getMostSubsChannelsAllTime().subscribe(data => {
        this.mostSubsChannelsAllTime = data;
      });
  
      this.channelService.getMostViewedChannelsAllTime().subscribe(data => {
        this.mostViewedChannelsAllTime = data;
      });
  
      this.channelService.getMostViewedChannelsLastWeek().subscribe(data => {
        this.mostViewedChannelsLastWeek = data;
      });

      this.channelsFirstLoad = false;
    }
    
    this.showChannels = !this.showChannels;
  }
}
