import { Channel } from './channel.model';
import { Video } from './video.model';

export interface Playlist {
  id: number;
  uuid: string;
  channel: Channel;
  title: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
}

export interface PlaylistVideo {
  id: number;
  video: Video;
  playlist: Playlist;
  position: number;
}

export interface SavedPlaylist {
  id: number;
  saverId: number;
  playlist: Playlist;
  savedAt: string;
}
