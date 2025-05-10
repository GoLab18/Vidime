import { Channel } from './channel.model';
import { Video } from './video.model';

export interface Comment {
  id: number;
  channel: Channel;
  video: Video;
  content: string;
  createdAt: string;
}
