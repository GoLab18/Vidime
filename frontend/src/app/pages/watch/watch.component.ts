import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

enum VideoState {
  PLAYING,
  PAUSED,
  ENDED
}

@Component({
  selector: 'app-watch',
  imports: [CommonModule],
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
})
export class WatchComponent implements AfterViewInit {
  infoCollapsed: boolean = true;
  videoState: VideoState = VideoState.PAUSED;
  @ViewChild('videoOverlay') videoOverlay!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.videoOverlay.nativeElement.focus();
  }

  handleVideoStateButton() {
    switch (this.videoState) {
      case VideoState.PLAYING:
        this.videoState = VideoState.PAUSED;
        break;
      case VideoState.PAUSED:
        this.videoState = VideoState.PLAYING;
        break;
      case VideoState.ENDED:
        this.videoState = VideoState.PAUSED;
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
      ended: this.videoState === VideoState.ENDED
    };
  }

  onImageLoad(video: any) {
    video.thumbnailLoaded = true;
  }

  toggleInfoPanel() {
    this.infoCollapsed = !this.infoCollapsed;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    if (document.activeElement !== this.videoOverlay.nativeElement) return;

    switch (event.key) {
      case 'ArrowLeft':
        this.videoPlayer.nativeElement.currentTime -= 10;
        break;
      case 'ArrowRight':
        this.videoPlayer.nativeElement.currentTime += 10;
        break;
      case 'ArrowUp':
        this.videoPlayer.nativeElement.volume += 0.1;
        break;
      case 'ArrowDown':
        this.videoPlayer.nativeElement.volume -= 0.1;
        break;
      case 'm':
        this.videoPlayer.nativeElement.muted = !this.videoPlayer.nativeElement.muted;
        break;
      case ' ':
        this.handleVideoStateButton();
        break;
    }
  }

  videoUrl: string = 'https://www.w3schools.com/html/mov_bbb.mp4';
  videoThumbnailUrl: string = 'https://picsum.photos/1600/900';
  videoTitle: string = 'A Unique Video Experience';
  videoViews: number = 12054;
  videoDate: string = '2025-04-28';
  videoDescription: string = 'This is a demonstration of a unique, immersive watch page with live reactions, chapters, and a modern layout.';

  relatedVideos: any[] = [
    {
      thumbnail: 'https://picsum.photos/1600/900?random=1',
      title: 'Next Up: Adventure',
      channel: 'Vidime Channel',
      views: 123456,
      duration: '12:34',
      added: '2 hours ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=2',
      title: 'Learning Angular 19 in 2025 - from beginner to master web designer - learn today',
      channel: 'CodeLab',
      views: 56789,
      duration: '25:12',
      added: '1 day ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=3',
      title: 'Top 10 UI Trends',
      channel: 'DesignHub',
      views: 89012,
      duration: '18:45',
      added: '3 days ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=4',
      title: 'React vs Vue: Which is Better?',
      channel: 'DevTalk',
      views: 98765,
      duration: '35:20',
      added: '5 days ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=5',
      title: 'Modern CSS Techniques',
      channel: 'CSS Master',
      views: 45678,
      duration: '22:15',
      added: '1 week ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=6',
      title: 'Node.js Best Practices',
      channel: 'Node Academy',
      views: 76543,
      duration: '45:30',
      added: '2 weeks ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=7',
      title: 'Web Performance Optimization',
      channel: 'Performance Pro',
      views: 65432,
      duration: '30:45',
      added: '3 weeks ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=8',
      title: 'TypeScript Fundamentals',
      channel: 'TypeScript Tutor',
      views: 87654,
      duration: '28:15',
      added: '1 month ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=9',
      title: 'Git for Beginners',
      channel: 'Git Guru',
      views: 34567,
      duration: '15:30',
      added: '2 months ago',
      thumbnailLoaded: false
    },
    {
      thumbnail: 'https://picsum.photos/1600/900?random=10',
      title: 'Docker Containerization',
      channel: 'Docker Expert',
      views: 54321,
      duration: '40:25',
      added: '3 months ago',
      thumbnailLoaded: false
    }
  ];

  comments = [
    { author: 'Alice', text: 'Love this unique layout!' },
    { author: 'Bob', text: 'The reactions are so fun!' },
    { author: 'Charlie', text: 'Chapters make navigation easy.' }
  ];
}
