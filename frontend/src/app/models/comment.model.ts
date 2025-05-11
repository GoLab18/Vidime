import { Channel } from './channel.model';
import { Video } from './video.model';

export interface Comment {
  id: number;
  channel: Channel;
  video?: Video;
  content: string;
  likes: number;
  dislikes: number;
  repliesAmount: number;
  createdAt: string;
}

export interface Reply {
  id: number;
  channel: Channel;
  parentComment?: Comment;
  likes: number;
  dislikes: number;
  content: string;
  createdAt: string;
}
