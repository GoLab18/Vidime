import { Channel } from './channel.model';
import { Video } from './video.model';

export interface Rating {
  id: number;
  channel: Channel;
  video: Video;
  level: number;
  createdAt: string;
}
