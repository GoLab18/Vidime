import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private httpClient: HttpClient) {}

  private mockComments: Comment[] = [
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
      video: {
        id: 1,
        title: "Understanding Observables in Angular",
        uuid: "123e4567-e89b-12d3-a456-426614175001",
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
        tags: [
          { id: 17, name: 'Tech' },
          { id: 18, name: 'Sustainability' }
        ],
        description: "A comprehensive guide to understanding observables.",
        cdnUrl: "https://cdn.example.com/videos/observables.mp4",
        thumbnailUrl: "https://cdn.example.com/thumbnails/observables.jpg",
        duration: 845,
        views: 13500,
        ratings: 320,
        avgRating: 4.6,
        addedAt: new Date(2024, 10, 10).toISOString()
      },
      content: "Great video! The explanation was really clear and helpful.",
      likes: 156,
      dislikes: 3,
      repliesAmount: 0,
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
    },
    {
      id: 2,
      channel: {
        id: 2,
        name: "CodeWithAnna",
        picture: "https://picsum.photos/100/100?2",
        verified: false,
        uuid: "123e4567-e89b-12d3-a456-426614175002",
        description: "Beginner-friendly coding tutorials.",
        userId: 102,
        videosAmount: 19,
        subscribersCount: 4300,
        createdAt: new Date(2023, 5, 22).toISOString()
      },
      video: {
        id: 1,
        title: "Understanding Observables in Angular",
        uuid: "123e4567-e89b-12d3-a456-426614175001",
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
        tags: [
          { id: 17, name: 'Tech' },
          { id: 18, name: 'Sustainability' }
        ],
        description: "A comprehensive guide to understanding observables.",
        cdnUrl: "https://cdn.example.com/videos/observables.mp4",
        thumbnailUrl: "https://cdn.example.com/thumbnails/observables.jpg",
        duration: 845,
        views: 13500,
        ratings: 320,
        avgRating: 4.6,
        addedAt: new Date(2024, 10, 10).toISOString()
      },
      content: "Could you also make a video about Subjects and BehaviorSubjects?",
      likes: 89,
      dislikes: 0,
      repliesAmount: 2,
      createdAt: new Date(Date.now() - 5 * 3600000).toISOString()
    },
    {
      id: 3,
      channel: {
        id: 3,
        name: "FrontendGuru",
        picture: "https://picsum.photos/100/100?3",
        verified: true,
        uuid: "123e4567-e89b-12d3-a456-426614175003",
        description: "Master frontend technologies with in-depth tutorials.",
        userId: 103,
        videosAmount: 73,
        subscribersCount: 24000,
        createdAt: new Date(2021, 10, 5).toISOString()
      },
      video: {
        id: 1,
        title: "Understanding Observables in Angular",
        uuid: "123e4567-e89b-12d3-a456-426614175001",
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
        tags: [
          { id: 15, name: 'Fitness' },
          { id: 16, name: 'Health' }
        ],
        description: "A comprehensive guide to understanding observables.",
        cdnUrl: "https://cdn.example.com/videos/observables.mp4",
        thumbnailUrl: "https://cdn.example.com/thumbnails/observables.jpg",
        duration: 845,
        views: 13500,
        ratings: 320,
        avgRating: 4.6,
        addedAt: new Date(2024, 10, 10).toISOString()
      },
      content: "This is the best RxJS explanation I’ve seen in a while. Subscribed!",
      likes: 210,
      dislikes: 1,
      repliesAmount: 0,
      createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      id: 4,
      channel: {
        id: 4,
        name: "DevDaily",
        picture: "https://picsum.photos/100/100?4",
        verified: false,
        uuid: "123e4567-e89b-12d3-a456-426614175004",
        description: "Daily development tips and tricks.",
        userId: 104,
        videosAmount: 150,
        subscribersCount: 5400,
        createdAt: new Date(2020, 6, 10).toISOString()
      },
      video: {
        id: 1,
        title: "Understanding Observables in Angular",
        uuid: "123e4567-e89b-12d3-a456-426614175001",
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
        tags: [
          { id: 11, name: 'Science' },
          { id: 12, name: 'Space' }
        ],
        description: "A comprehensive guide to understanding observables.",
        cdnUrl: "https://cdn.example.com/videos/observables.mp4",
        thumbnailUrl: "https://cdn.example.com/thumbnails/observables.jpg",
        duration: 845,
        views: 13500,
        ratings: 320,
        avgRating: 4.6,
        addedAt: new Date(2024, 10, 10).toISOString()
      },
      content: "Nice! I was confused by `subscribe()` before watching this.",
      likes: 58,
      dislikes: 2,
      repliesAmount: 1,
      createdAt: new Date(Date.now() - 3 * 3600000).toISOString()
    },
    {
      id: 5,
      channel: {
        id: 5,
        name: "AngularNinja",
        picture: "https://picsum.photos/100/100?5",
        verified: true,
        uuid: "123e4567-e89b-12d3-a456-426614175005",
        description: "Sharp Angular tips, fast.",
        userId: 105,
        videosAmount: 27,
        subscribersCount: 6700,
        createdAt: new Date(2023, 8, 19).toISOString()
      },
      video: {
        id: 1,
        title: "Understanding Observables in Angular",
        uuid: "123e4567-e89b-12d3-a456-426614175001",
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
        tags: [
          { id: 13, name: 'Music' },
          { id: 14, name: 'Performance' }
        ],
        description: "A comprehensive guide to understanding observables.",
        cdnUrl: "https://cdn.example.com/videos/observables.mp4",
        thumbnailUrl: "https://cdn.example.com/thumbnails/observables.jpg",
        duration: 845,
        views: 13500,
        ratings: 320,
        avgRating: 4.6,
        addedAt: new Date(2024, 10, 10).toISOString()
      },
      content: "Don’t forget to `unsubscribe()`! That’s a big one. 🔥",
      likes: 134,
      dislikes: 0,
      repliesAmount: 0,
      createdAt: new Date(Date.now() - 12 * 3600000).toISOString()
    }
  ];

  getVideoComments(videoId: number): Observable<Comment[]> {
    return of(this.mockComments.filter(c => c.video!.id === videoId)).pipe(delay(500));
  }
  
  addComment(videoId: number, content: string): Observable<Comment> { // TODO on backend integration handle it through sending the comment and waiting for a success/failure response
    let comment: Comment = {
      id: this.mockComments.length + 1,
      channel: {
        id: 6,
        name: "JSWorld",
        picture: "https://picsum.photos/100/100?6",
        verified: false,
        uuid: "123e4567-e89b-12d3-a456-426614175006",
        description: "Exploring the JavaScript ecosystem one video at a time.",
        userId: 106,
        videosAmount: 91,
        subscribersCount: 8200,
        createdAt: new Date(2022, 12, 1).toISOString()
      },
      video: {
        id: 1,
        title: "Understanding Observables in Angular",
        uuid: "123e4567-e89b-12d3-a456-426614175001",
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
        tags: [
          { id: 9, name: 'Food' },
          { id: 10, name: 'Cuisine' }
        ],
        description: "A comprehensive guide to understanding observables.",
        cdnUrl: "https://cdn.example.com/videos/observables.mp4",
        thumbnailUrl: "https://cdn.example.com/thumbnails/observables.jpg",
        duration: 845,
        views: 13500,
        ratings: 320,
        avgRating: 4.6,
        addedAt: new Date(2024, 10, 10).toISOString()
      },
      content: content,
      likes: 0,
      dislikes: 0,
      repliesAmount: 0,
      createdAt: new Date(Date.now()).toISOString()
    };

    this.mockComments.unshift(comment);

    return of(comment).pipe(delay(500));
  }
}
