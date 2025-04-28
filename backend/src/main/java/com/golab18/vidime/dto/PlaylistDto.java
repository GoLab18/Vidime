package com.golab18.vidime.dto;

import java.util.List;

import lombok.Data;

@Data
public class PlaylistDto {
    private Long id;
    private ChannelDto channel;
    private String title;
    private String description;
    private Boolean isPublic;
    private String createdAt;
}
