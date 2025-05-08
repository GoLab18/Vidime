package com.golab18.vidime.dto;

import java.util.List;

import lombok.Data;

@Data
public class VideoDto {
    private Long id;
    private String uuid;
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
    private String addedAt;
}
