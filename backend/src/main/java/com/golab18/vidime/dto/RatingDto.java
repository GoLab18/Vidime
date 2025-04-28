package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class RatingDto {
    private Long id;
    private ChannelDto channel;
    private VideoDto video;
    private Integer level;
    private String createdAt;
}
