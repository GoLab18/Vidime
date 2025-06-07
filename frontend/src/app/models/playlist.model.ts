import { ChannelSlim } from './channel.model';
import { Video } from './video.model';

export interface Playlist {
  id: number;
  uuid: string;
  channel?: ChannelSlim;
  title: string;
  description: string;
  thumbnailUrl: string;
  isPublic: boolean;
  videoCount: number;
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
