import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Reply } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  constructor(private httpClient: HttpClient) {}

  private mockRepliesCommentId2: Reply[] = [
    {
      id: 1,
      channel: {
        id: 1,
        name: "TechEnthusiast123",
        picture: "https://picsum.photos/100/100?1",
        verified: true,
        uuid: "123e4567-e89b-12d3-a456-426614175000",
        description: "All things tech and tutorials.",
        userId: 101,
        videosAmount: 42,
        subscribersCount: 12000,
        createdAt: new Date(2022, 3, 15).toISOString()
      },
      parentComment: undefined,
      likes: 156,
      dislikes: 3,
      content: "What bro?",
      createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
    },
    {
      id: 2,
      channel: {
        id: 2,
        name: "Nobody",
        picture: "https://picsum.photos/100/100?2",
        verified: false,
        uuid: "123e4567-e89b-12d3-a456-426614175000",
        description: "I am a nobody",
        userId: 102,
        videosAmount: 0,
        subscribersCount: 0,
        createdAt: new Date(2022, 3, 15).toISOString()
      },
      parentComment: undefined,
      likes: 0,
      dislikes: 1,
      content: "What is he on about ???",
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
    }
  ];

  private mockRepliesCommentId4: Reply[] = [
    {
      id: 1,
      channel: {
        id: 1,
        name: "Peter",
        picture: "https://picsum.photos/100/100?1",
        verified: false,
        uuid: "123e4567-e89b-12d3-a456-426614175000",
        description: "",
        userId: 103,
        videosAmount: 2,
        subscribersCount: 17,
        createdAt: new Date(2023, 3, 15).toISOString()
      },
      parentComment: undefined,
      likes: 12,
      dislikes: 1,
      content: "I don't know, don't ask me",
      createdAt: new Date(Date.now() - 1 * 3600000).toISOString()
    }
  ];

  getCommentReplies(commentId: number): Observable<Reply[]> {
    return of((commentId == 2) ? this.mockRepliesCommentId2 : (commentId == 4) ? this.mockRepliesCommentId4 : []).pipe(delay(500));
  }
}
