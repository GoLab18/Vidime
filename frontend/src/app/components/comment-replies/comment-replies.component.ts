import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models/comment.model';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-comment-replies',
  imports: [CommonModule, FormatDatePipe],
  templateUrl: './comment-replies.component.html',
  styleUrl: './comment-replies.component.css'
})
export class CommentRepliesComponent {
  @Input() commentId!: number;
  @Input() repliesAmount!: number;

  replies: Reply[] = [];
  repliesLoaded: boolean = false;
  isExpanded: boolean = false;

  constructor(private replyService: ReplyService, private router: Router) {}

  ngOnInit() {
    this.replyService.getCommentReplies(this.commentId).subscribe((replies) => {
      this.replies = replies;
      this.repliesLoaded = true;
    });
  }

  toggleReplies() {
    this.isExpanded = !this.isExpanded;
  }

  navigateToChannel(channelId: number, channelUuid: string) {
    this.router.navigate(['/channel'], { queryParams: { i: channelId, c: channelUuid } });
  }
}
