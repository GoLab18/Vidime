import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatedVideoComponent } from '../../components/related-video/related-video.component';
import { VideoService } from '../../services/video.service';
import { CommentService } from '../../services/comment.service';
import { VideoSlim } from '../../models/video.model';
import { Comment } from '../../models/comment.model';
import { CommentRepliesComponent } from '../../components/comment-replies/comment-replies.component';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { VideoWatchPanelComponent } from '../../components/video-watch-panel/video-watch-panel.component';
import { ChannelSlim } from '../../models/channel.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-watch',
  imports: [CommonModule, FormsModule, VideoWatchPanelComponent, RelatedVideoComponent, CommentRepliesComponent, FormatDatePipe],
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements OnInit {
  videoId!: number;
  relatedVideos: VideoSlim[] = [];
  comments: Comment[] = [];
  currChannel: ChannelSlim | null;

  commentSectionCollapsed: boolean = true;
  videoCommentsLoaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private commentService: CommentService,
    private router: Router,
    private authService: AuthService
  ) {
    this.currChannel = this.authService.currChannelValue;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      let newVideoId = Number(params.get('i'));
      // this.videoId = Number(params.get('i'));
      if (this.videoId !== newVideoId) {
        this.videoId = newVideoId;

        this.comments = [];
        this.videoCommentsLoaded = false;

        this.fetchRelatedVideos();

        if (!this.commentSectionCollapsed) this.loadComments();
      }
    });
  }
  
  toggleCommentSectionPanel() {
    this.commentSectionCollapsed = !this.commentSectionCollapsed;

    if (!this.commentSectionCollapsed && !this.videoCommentsLoaded) this.loadComments();
  }

  loadComments() {
    this.commentService.getVideoComments(this.videoId).subscribe((comments) => {
      this.comments = comments;
      this.videoCommentsLoaded = true;
    });
  }

  fetchRelatedVideos() {
    this.videoService.getRelatedVideos(this.videoId).subscribe((videos) => {
      this.relatedVideos = videos;
    });
  }

  navigateToChannel(channelId: number, channelUuid: string) {
    this.router.navigate(['/channel'], { queryParams: { i: channelId, c: channelUuid } });
  }

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
