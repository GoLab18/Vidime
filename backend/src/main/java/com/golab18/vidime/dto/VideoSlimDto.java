package com.golab18.vidime.dto;

import java.util.Set;

import lombok.Data;

@Data
public class VideoSlimDto {
    private Long id;
    private String uuid;
    private ChannelDto channel;
    private Set<TagDto> tags;
    private String title;
    private String thumbnailUrl;
    private Integer duration;
    private Integer views;
    private String addedAt;
}
