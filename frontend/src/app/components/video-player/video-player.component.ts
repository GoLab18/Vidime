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

  videoState: VideoState = VideoState.PAUSED;
  @ViewChild('videoOverlay') videoOverlay!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

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

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    if (document.activeElement !== this.videoOverlay.nativeElement) return;

    switch (event.key) {
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
        this.videoPlayer.nativeElement.volume += 0.1;
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.videoPlayer.nativeElement.volume -= 0.1;
        break;
      case 'm':
        event.preventDefault();
        this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
        break;
      case ' ':
        event.preventDefault();
        this.handleVideoStateButton();
        break;
    }
  }
}
