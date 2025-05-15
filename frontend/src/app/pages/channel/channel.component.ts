import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { ActivatedRoute } from '@angular/router';
import { ChannelLink } from '../../models/channel-link.model';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { Playlist } from '../../models/playlist.model';
import { PlaylistService } from '../../services/playlist.service';
import { HorizontalGroupScrollComponent } from '../../components/horizontal-group-scroll/horizontal-group-scroll.component';

export enum ChannelTab {
  VIDEOS,
  PLAYLISTS
}

@Component({
  selector: 'app-channel',
  imports: [CommonModule, HorizontalGroupScrollComponent, FormatNumberPipe, FormatDatePipe],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  @Input({required: true}) videoId!: number;

  ChannelTab = ChannelTab;
  activeTab: ChannelTab = ChannelTab.VIDEOS;

  channel!: Channel;
  links: ChannelLink[] = [];
  videos: Video[] = [];
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
      this.videoId = Number(params.get('i'));
      this.videoId = 101;
      
      this.channelService.getChannel(this.videoId).subscribe(channel => {
        this.channel = channel;
        this.channelService.getLinks(this.channel.id).subscribe(links => this.links = links);
      });

      this.videoService.getChannelVideos(this.videoId).subscribe(videos => {
        this.videos = videos;
      });
    });
  }

  switchTab(tab: ChannelTab) {
    this.activeTab = tab;
    
    if (tab === ChannelTab.PLAYLISTS && !this.playlistsLoaded) {
      this.playlistService.getChannelPlaylists(this.videoId).subscribe(playlists => {
        this.playlists = playlists;
        this.playlistsLoaded = true;
      });
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
