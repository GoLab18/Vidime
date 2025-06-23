import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { ActivatedRoute } from '@angular/router';
import { ChannelLink } from '../../models/channel-link.model';
import { VideoSlim } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../services/playlist.service';
import { HorizontalGroupScrollComponent } from '../../components/horizontal-group-scroll/horizontal-group-scroll.component';
import { DynamicSizeTileGridComponent } from '../../components/dynamic-size-tile-grid/dynamic-size-tile-grid.component';
import { SortOrder } from '../../util/sorting';

export enum ChannelTab {
  VIDEOS,
  PLAYLISTS
}

@Component({
  selector: 'app-channel',
  imports: [CommonModule, HorizontalGroupScrollComponent, DynamicSizeTileGridComponent, FormatNumberPipe, FormatDatePipe],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  @Input({required: true}) channelId!: number;

  ChannelTab = ChannelTab;
  activeTab: ChannelTab = ChannelTab.VIDEOS;

  channel!: Channel;
  links: ChannelLink[] = [];
  newestVideos: VideoSlim[] = [];
  mostViewedVideos: VideoSlim[] = [];
  bestRatedVideos: VideoSlim[] = [];
  playlists: Playlist[] = [];
  playlistsLoaded: boolean = false;

  constructor(
    private channelService: ChannelService,
    private videoService: VideoService,
    private playlistService: PlaylistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.channelId = Number(params.get('i'));
      
      this.channelService.getChannel(this.channelId).subscribe(channel => {
        this.channel = channel;
        this.channelService.getLinks(this.channel.id).subscribe(links => this.links = links);
      });

      this.videoService.getChannelVideos(this.channelId, "addedAt", SortOrder.DESC).subscribe(videos => {
        this.newestVideos = videos;
      });

      this.videoService.getChannelVideos(this.channelId, "views", SortOrder.DESC).subscribe(videos => {
        this.mostViewedVideos = videos;
      });

      this.videoService.getChannelVideos(this.channelId, "avgRating", SortOrder.DESC).subscribe(videos => {
        this.bestRatedVideos = videos;
      });
    });
  }

  switchTab(tab: ChannelTab) {
    this.activeTab = tab;
    
    if (tab === ChannelTab.PLAYLISTS && !this.playlistsLoaded) {
      this.playlistService.getChannelPlaylists(this.channelId).subscribe(playlists => {
        this.playlists = playlists;
        this.playlistsLoaded = true;
      });
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
