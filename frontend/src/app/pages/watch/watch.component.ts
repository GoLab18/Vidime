import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { RelatedVideoComponent } from '../../components/related-video/related-video.component';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video.model';

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
  imports: [CommonModule, FormsModule, VideoPlayerComponent, RelatedVideoComponent],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  commentSectionCollapsed: boolean = true;
  videoId!: number;
  relatedVideos: Video[] = [];

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.videoId = Number(params.get('i'));
      this.fetchRelatedVideos();
    });
  }

  toggleCommentSectionPanel() {
    this.commentSectionCollapsed = !this.commentSectionCollapsed;
  }

  fetchRelatedVideos() {
    this.videoService.getRelatedVideos(this.videoId).subscribe((videos) => {
      this.relatedVideos = videos;
    });
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
      replies: [
        {
          id: 1,
          content: 'Amazing video! The production quality is top-notch.',
          author: 'TechFan',
          timestamp: '2 hours ago',
          likes: 123,
          replies: []
        }
      ]
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

  commentsList = [
    { author: 'Alice', text: 'Love this unique layout!' },
    { author: 'Bob', text: 'The reactions are so fun!' },
    { author: 'Charlie', text: 'Chapters make navigation easy.' }
  ];
}
