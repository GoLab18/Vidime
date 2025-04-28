package com.golab18.vidime.dto;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class VideoDto {
    private Long id;
    private UUID uuid;
    private ChannelDto channel;
    private List<TagDto> tags;
    private String title;
    private String description;
    private String cdnUrl;
    private String thumbnailUrl;
    private Integer duration;
    private Integer views;
    private Integer ratings;
    private Float avgRating;
    private Timestamp addedAt;
}
