package com.golab18.vidime.dto;

import java.util.List;

import lombok.Data;

@Data
public class VideoCreateDto {
    private Long channelId;
    private List<TagCreateDto> tags;
    private String title;
    private String description;
    private String cdnUrl;
    private String thumbnailUrl;
    private Integer duration;
}
