import { Channel } from './channel.model';

export interface Poll {
  id: number;
  videoId: number;
  options: PollOption[];
  textHeader: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface PollOption {
  id: number;
  pollId: number;
  optionText: string;
  votes: number;
}

export interface PollVote {
  id: number;
  pollId: number;
  voter: Channel;
  optionId: number;
  votedAt: string;
}
