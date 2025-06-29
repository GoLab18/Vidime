package com.golab18.vidime.dto;

import java.sql.Timestamp;
import java.util.UUID;

import lombok.Data;

@Data
public class StatsVideo {
    private Long id;
    private String uuid;
    private String title;
    private String thumbnailUrl;
    private Integer duration;
    private Integer views;
    private String addedAt;
    private Long viewsPeriod;

    public StatsVideo(
        Long id, UUID uuid, String title, String thumbnailUrl, Integer duration, Integer views, Timestamp addedAt, Long viewsPeriod
    ) {
        this.id = id;
        this.uuid = uuid.toString();
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.duration = duration;
        this.views = views;
        this.addedAt = addedAt.toString();
        this.viewsPeriod = viewsPeriod;
    }
}
