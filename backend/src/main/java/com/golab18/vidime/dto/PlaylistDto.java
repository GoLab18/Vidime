package com.golab18.vidime.dto;

import java.util.List;

import lombok.Data;

@Data
public class PlaylistDto {
    private Long id;
    private String uuid;
    private ChannelDto channel;
    private String title;
    private String description;
    private String thumbnailUrl;
    private Boolean isPublic;
    private Integer videoCount;
    private String createdAt;
}
