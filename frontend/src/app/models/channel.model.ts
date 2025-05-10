export interface Channel {
  id: number;
  uuid: string;
  name: string;
  picture: string;
  description: string;
  userId: number;
  videosAmount: number;
  subscribersCount: number;
  verified: boolean;
  createdAt: string;
}
