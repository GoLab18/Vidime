import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Video } from '../../models/video.model';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { VideoService } from '../../services/video.service';

enum VideoState {
  PLAYING,
  PAUSED,
  ENDED
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
  imports: [CommonModule, FormatNumberPipe, FormatDatePipe]
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  @Input({required: true}) videoId!: number;

  @ViewChild('videoOverlay') videoOverlay!: ElementRef;
  @ViewChild('videoPlayerContainer') videoPlayerContainer!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('volumeSliderContainer') volumeSliderContainer!: ElementRef;

  video: Video | undefined;
  isLoading = true;

  videoState: VideoState = VideoState.PAUSED;
  isFullscreen = false;
  isMiniPlayer = false;
  isMuted = false;
  volume = 1;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.loadVideo();
  }

  loadVideo() {
    this.isLoading = true;

    this.videoService.getVideo(this.videoId).subscribe((video) => {
      this.video = video;
      this.isLoading = false;

      setTimeout(() => {
        this.videoOverlay?.nativeElement?.focus();
        this.videoPlayer.nativeElement.addEventListener('ended', () => {
          this.videoState = VideoState.ENDED;
        });
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId']) {
      this.loadVideo();
    }
  }

  handleVideoStateButton() {
    switch (this.videoState) {
      case VideoState.PLAYING:
        this.videoState = VideoState.PAUSED;
        this.videoPlayer.nativeElement.pause();
        break;
      case VideoState.PAUSED:
        this.videoState = VideoState.PLAYING;
        this.videoPlayer.nativeElement.play();
        break;
      case VideoState.ENDED:
        this.videoPlayer.nativeElement.currentTime = 0;
        this.videoState = VideoState.PLAYING;
        this.videoPlayer.nativeElement.play();
        break;
    }
  }

  get controlIcon(): string {
    switch (this.videoState) {
      case VideoState.PLAYING:
        return 'pause';
      case VideoState.ENDED:
        return 'replay';
      case VideoState.PAUSED:
        return 'play_arrow';
    }
  }

  setVideoStateClass() {
    return {
      playing: this.videoState === VideoState.PLAYING,
      paused: this.videoState === VideoState.PAUSED,
      ended: this.videoState === VideoState.ENDED,
    };
  }

  toggleFullscreen() {
    if (this.isFullscreen) document.exitFullscreen();
    else this.videoPlayerContainer.nativeElement.requestFullscreen();

    this.isFullscreen = !this.isFullscreen;
  }

  toggleMiniPlayer() {
    if (this.isMiniPlayer) this.videoPlayer.nativeElement.requestPictureInPicture();
    else document.exitPictureInPicture();

    this.isMiniPlayer = !this.isMiniPlayer;
  }

  handleTabSpaceInvoke(active: HTMLElement) {
    switch (active.id) {
      case 'state-button':
        this.handleVideoStateButton();
        break;
      case 'mini-player-button':
        this.toggleMiniPlayer();
        break;
      case 'fullscreen-button':
        this.toggleFullscreen();
        break;
      default:
        this.handleVideoStateButton();
        break;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.videoPlayer.nativeElement.muted = this.isMuted;
    
    this.videoPlayer.nativeElement.volume = this.isMuted ? 0 : this.volume;
  }

  handleVolumeChange(event: Event) {
    let target = event.target as HTMLInputElement;
    let newVolume = parseFloat(target.value) / 100;
    
    this.isMuted
      ? this.isMuted = false
      : this.videoPlayer.nativeElement.muted = false;
    
    this.volume = newVolume;
    this.videoPlayer.nativeElement.volume = newVolume;
  }

  handleArrowsVolumeChange(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        this.videoPlayer.nativeElement.volume = Math.max(this.videoPlayer.nativeElement.volume - 0.05, 0);
        this.volume = this.videoPlayer.nativeElement.volume;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        this.videoPlayer.nativeElement.volume = Math.min(this.videoPlayer.nativeElement.volume + 0.05, 1);
        this.volume = this.videoPlayer.nativeElement.volume;
        break;
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    let active = document.activeElement as HTMLElement;
  
    if (!this.videoOverlay.nativeElement.contains(active)) return;

    switch (event.key) {
      case ' ':
        event.preventDefault();
        this.handleTabSpaceInvoke(active);
        break;
      case 'i':
        event.preventDefault();
        this.toggleMiniPlayer();
        break;
      case 'f':
        event.preventDefault();
        this.toggleFullscreen();
        break;
      case 'Escape':
        event.preventDefault();
        if (this.isFullscreen) this.toggleFullscreen();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (this.volumeSliderContainer.nativeElement === active) this.handleArrowsVolumeChange(event);
        else {
          this.videoPlayer.nativeElement.currentTime -= 5;
          if (this.videoState === VideoState.ENDED) {
            this.videoState = VideoState.PLAYING;
            this.videoPlayer.nativeElement.play();
          }
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (this.volumeSliderContainer.nativeElement === active) this.handleArrowsVolumeChange(event);
        else this.videoPlayer.nativeElement.currentTime += 5;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.handleArrowsVolumeChange(event);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.handleArrowsVolumeChange(event);
        break;
      case 'm':
        event.preventDefault();
        this.toggleMute();
        break;
    }
  }

  @HostListener('document:fullscreenchange', ['$event'])
  handleFullscreenChange(event: KeyboardEvent) {
    switch (event.type) {
      case 'fullscreenchange':
        this.isFullscreen = !!document.fullscreenElement;
        break;
    }
  }
}
