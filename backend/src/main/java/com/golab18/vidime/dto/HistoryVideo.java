package com.golab18.vidime.dto;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.Data;

@Data
public class HistoryVideo {
    private Long id;
    private String uuid;
    private ChannelSlimDto channel;
    private String title;
    private String description;
    private String thumbnailUrl;
    private Integer duration;
    private Integer views;
    private String addedAt;
    private String lastWatchedAt;

    public HistoryVideo(
        Long id, UUID uuid, ChannelSlimDto channel, String title, String description,
        String thumbnailUrl, Integer duration, Integer views, Timestamp addedAt, Timestamp lastWatchedAt
    ) {
        this.id = id;
        this.uuid = uuid.toString();
        this.channel = channel;
        this.title = title;
        this.description = description;
        this.thumbnailUrl = thumbnailUrl;
        this.duration = duration;
        this.views = views;
        this.addedAt = addedAt.toString();
        this.lastWatchedAt = lastWatchedAt.toString();
    }
}
