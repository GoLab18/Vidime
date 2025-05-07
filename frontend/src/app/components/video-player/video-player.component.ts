import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, HostListener, AfterViewInit } from '@angular/core';

enum VideoState {
  PLAYING,
  PAUSED,
  ENDED
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
  imports: [CommonModule]
})
export class VideoPlayerComponent implements AfterViewInit {
  @Input() video: any;
  @Input() channel: any;

  @ViewChild('videoOverlay') videoOverlay!: ElementRef;
  @ViewChild('videoPlayerContainer') videoPlayerContainer!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  videoState: VideoState = VideoState.PAUSED;
  isFullscreen = false;
  isMiniPlayer = false;

  ngAfterViewInit() {
    this.videoOverlay.nativeElement.focus();

    this.videoPlayer.nativeElement.addEventListener('ended', () => {
      this.videoState = VideoState.ENDED;
    });
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

  @HostListener('document:keydown', ['$event'])
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
        this.videoPlayer.nativeElement.currentTime -= 5;
        if (this.videoState === VideoState.ENDED) {
          this.videoState = VideoState.PLAYING;
          this.videoPlayer.nativeElement.play();
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.videoPlayer.nativeElement.currentTime += 5;
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.videoPlayer.nativeElement.volume = Math.min(this.videoPlayer.nativeElement.volume + 0.1, 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.videoPlayer.nativeElement.volume = Math.max(this.videoPlayer.nativeElement.volume - 0.1, 0);
        break;
      case 'm':
        event.preventDefault();
        this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
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
