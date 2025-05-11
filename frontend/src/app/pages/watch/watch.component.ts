import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { RelatedVideoComponent } from '../../components/related-video/related-video.component';
import { VideoService } from '../../services/video.service';
import { CommentService } from '../../services/comment.service';
import { Video } from '../../models/video.model';
import { Channel } from '../../models/channel.model';
import { Comment } from '../../models/comment.model';
import { CommentRepliesComponent } from '../../components/comment-replies/comment-replies.component';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-watch',
  imports: [CommonModule, FormsModule, VideoPlayerComponent, RelatedVideoComponent, CommentRepliesComponent, FormatDatePipe],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  videoId!: number;
  relatedVideos: Video[] = [];
  comments: Comment[] = [];

  commentSectionCollapsed: boolean = true;
  videoCommentsLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private videoService: VideoService, private commentService: CommentService) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.videoId = Number(params.get('i'));
      this.fetchRelatedVideos();
    });
  }

  toggleCommentSectionPanel() {
    this.commentSectionCollapsed = !this.commentSectionCollapsed;

    if (!this.commentSectionCollapsed && !this.videoCommentsLoaded) {
      this.commentService.getVideoComments(this.videoId).subscribe((comments) => {
        this.comments = comments;
        this.videoCommentsLoaded = true;
      });
    }
  }

  fetchRelatedVideos() {
    this.videoService.getRelatedVideos(this.videoId).subscribe((videos) => {
      this.relatedVideos = videos;
    });
  }

  mockChannel: Channel = {
    id: 134,
    uuid: '123e4567-e89b-12d3-a456-426614174999',
    name: 'Hitachi',
    picture: 'https://picsum.photos/1600/900',
    description: 'Hi, welcome :)',
    userId: 1,
    videosAmount: 21,
    subscribersCount: 1577,
    verified: true,
    createdAt: new Date().toISOString()
  };

  newCommentContent = '';

  addComment() {
    if (this.newCommentContent.trim()) {
      this.commentService.addComment(this.videoId, this.newCommentContent).subscribe((comment) => {
        this.comments.unshift(comment);
        this.newCommentContent = '';
      });
    }
  }
}
