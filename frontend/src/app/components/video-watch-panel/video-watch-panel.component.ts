import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-video-watch-panel',
  imports: [CommonModule, VideoPlayerComponent, FormatNumberPipe, FormatDatePipe],
  templateUrl: './video-watch-panel.component.html',
  styleUrl: './video-watch-panel.component.css'
})
export class VideoWatchPanelComponent implements OnInit, OnChanges {
  @Input({required: true}) videoId!: number;

  video?: Video;

  constructor(private videoService: VideoService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadVideo();
  }

  get isCurrentChannelsVideo(): boolean {
    return this.video?.channel?.id === this.authService.currentChannelId;
  }

  loadVideo() {
    this.videoService.getFullVideoById(this.videoId).subscribe((video) => {
      this.video = video;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId']) this.loadVideo();
  }

  navigateToChannel(channelId: number, channelUuid: string) {
    this.router.navigate(['/channel'], { queryParams: { i: channelId, c: channelUuid } });
  }
}
