import { Channel } from './channel.model';
import { User } from './user.model';

export interface Subscription {
  id: number;
  subscriber: User;
  channel: Channel;
  subscribedAt: string;
}
