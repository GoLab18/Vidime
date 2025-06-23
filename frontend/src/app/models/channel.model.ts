export interface ChannelSlim {
  id: number;
  uuid: string;
  name: string;
  picture?: string;
  userId: number;
  verified: boolean;
}

export interface ChannelTrending {
  id: number;
  uuid: string;
  name: string;
  picture: string;
  verified: boolean;
  subscribersCount: number;
  viewsAllTime: number;
}

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
