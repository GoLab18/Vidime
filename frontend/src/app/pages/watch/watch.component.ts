import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

enum VideoState {
  PLAYING,
  PAUSED,
  ENDED
}

interface Comment {
  id: number;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
}

@Component({
  selector: 'app-watch',
  imports: [CommonModule, FormsModule],
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css'],
})
export class WatchComponent implements AfterViewInit {
  commentSectionCollapsed: boolean = true;
  videoState: VideoState = VideoState.PAUSED;
  @ViewChild('videoOverlay') videoOverlay!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.video.uuid = this.route.snapshot.paramMap.get('uuid')!;
    var navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.video.id = navigation.extras.state['id'];
    }
  }

  navigateToVideo(videoUuid: string, id: number) {
    this.router.navigate(['/watch', videoUuid], { state: { id } });
  }

  ngAfterViewInit() {
    this.videoOverlay.nativeElement.focus();
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
        this.videoState = VideoState.PAUSED;
        this.videoPlayer.nativeElement.pause();
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

  onImageLoad(video: any) {
    video.thumbnailLoaded = true;
  }

  toggleCommentSectionPanel() {
    this.commentSectionCollapsed = !this.commentSectionCollapsed;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyDownEvent(event: KeyboardEvent) {
    if (document.activeElement !== this.videoOverlay.nativeElement) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.videoPlayer.nativeElement.currentTime -= 10;
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.videoPlayer.nativeElement.currentTime += 10;
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

  video = {
    id: 0,
    uuid: '123e4567-e89b-12d3-a456-426614172137',
    title: 'It was a good day',
    description: 'It is my first ever video, enjoy! :)',
    cdnUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://picsum.photos/1600/900',
    duration: 120,
    views: 120,
    ratings: 5,
    avgRating: 4.5,
    addedAt: '28-04-2025',
    averageRating: 4.3,
  }

  channel = {
    id: 0,
    name: 'Random Nights',
    picture: 'https://picsum.photos/50/50',
    subscribersCount: 120,
    videosAmount: 120,
    verified: false
  }

  comments: Comment[] = [
    {
      id: 1,
      content: 'Amazing video! The production quality is top-notch.',
      author: 'TechFan',
      timestamp: '2 hours ago',
      likes: 123,
      replies: []
    },
    {
      id: 2,
      content: 'I love the editing style. Very engaging!',
      author: 'VideoEnthusiast',
      timestamp: '3 hours ago',
      likes: 85,
      replies: []
    }
  ];

  newComment = {
    content: '',
    author: 'Anonymous'
  };

  addComment() {
    if (this.newComment.content.trim()) {
      const newId = this.comments.length + 1;
      const comment: Comment = {
        id: newId,
        content: this.newComment.content,
        author: this.newComment.author,
        timestamp: 'just now',
        likes: 0,
        replies: []
      };
      this.comments.unshift(comment);
      this.newComment.content = '';
    }
  }

  relatedVideos: any[] = [
    {
      uuid: '123e4567-e89b-12d3-a456-426614174010',
      id: 18,
      thumbnail: 'https://picsum.photos/1600/900?random=1',
      title: 'Next Up: Adventure',
      channel: 'Vidime Channel',
      views: 123456,
      duration: '12:34',
      added: '2 hours ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174011',
      id: 19,
      thumbnail: 'https://picsum.photos/1600/900?random=2',
      title: 'Learning Angular 19 in 2025 - from beginner to master web designer - learn today',
      channel: 'CodeLab',
      views: 56789,
      duration: '25:12',
      added: '1 day ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174012',
      id: 20,
      thumbnail: 'https://picsum.photos/1600/900?random=3',
      title: 'Top 10 UI Trends',
      channel: 'DesignHub',
      views: 89012,
      duration: '18:45',
      added: '3 days ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174013',
      id: 21,
      thumbnail: 'https://picsum.photos/1600/900?random=4',
      title: 'React vs Vue: Which is Better?',
      channel: 'DevTalk',
      views: 98765,
      duration: '35:20',
      added: '5 days ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174014',
      id: 22,
      thumbnail: 'https://picsum.photos/1600/900?random=5',
      title: 'Modern CSS Techniques',
      channel: 'CSS Master',
      views: 45678,
      duration: '22:15',
      added: '1 week ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174015',
      id: 23,
      thumbnail: 'https://picsum.photos/1600/900?random=6',
      title: 'Node.js Best Practices',
      channel: 'Node Academy',
      views: 76543,
      duration: '45:30',
      added: '2 weeks ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174016',
      id: 24,
      thumbnail: 'https://picsum.photos/1600/900?random=7',
      title: 'Web Performance Optimization',
      channel: 'Performance Pro',
      views: 65432,
      duration: '30:45',
      added: '3 weeks ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174017',
      id: 25,
      thumbnail: 'https://picsum.photos/1600/900?random=8',
      title: 'TypeScript Fundamentals',
      channel: 'TypeScript Tutor',
      views: 87654,
      duration: '28:15',
      added: '1 month ago',
      thumbnailLoaded: false
    },
    {
      uuid: '123e4567-e89b-12d3-a456-426614174018',
      id: 26,
      thumbnail: 'https://picsum.photos/1600/900?random=9',
      title: 'Git for Beginners',
      channel: 'Git Guru',
      views: 34567,
      duration: '15:30',
      added: '2 months ago',
      thumbnailLoaded: false
    }
  ];

  commentsList = [
    { author: 'Alice', text: 'Love this unique layout!' },
    { author: 'Bob', text: 'The reactions are so fun!' },
    { author: 'Charlie', text: 'Chapters make navigation easy.' }
  ];
}
