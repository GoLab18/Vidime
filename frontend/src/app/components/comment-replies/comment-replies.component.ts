import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../models/comment.model';

@Component({
  selector: 'app-comment-replies',
  imports: [CommonModule],
  templateUrl: './comment-replies.component.html',
  styleUrl: './comment-replies.component.css'
})
export class CommentRepliesComponent {
  @Input() commentId!: number;
  @Input() repliesAmount!: number;

  replies: Reply[] = [];
  repliesLoaded: boolean = false;
  isExpanded: boolean = false;

  constructor(private replyService: ReplyService) {}

  ngOnInit() {
    this.replyService.getCommentReplies(this.commentId).subscribe((replies) => {
      this.replies = replies;
      this.repliesLoaded = true;
    });
  }

  toggleReplies() {
    this.isExpanded = !this.isExpanded;
  }
}
