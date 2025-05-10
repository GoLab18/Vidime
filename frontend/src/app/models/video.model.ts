import { Channel } from "./channel.model";
import { Tag } from "./tag.model";

export interface Video {
    id: number;
    uuid: string;
    channel: Channel;
    tags: Tag[];
    title: string;
    description: string;
    cdnUrl: string;
    thumbnailUrl: string;
    duration: number;
    views: number;
    ratings: number;
    avgRating: number;
    addedAt: string;
}
