package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class ChannelDto {
    private Long id;
    private String uuid;
    private String name;
    private String picture;
    private String description;
    private UserDto user;
    private Integer videosAmount;
    private Integer subscribersCount;
    private Boolean verified;
    private String createdAt;
}
