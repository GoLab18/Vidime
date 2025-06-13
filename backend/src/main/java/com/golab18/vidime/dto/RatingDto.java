package com.golab18.vidime.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class RatingDto {
    private Long id;
    private ChannelDto rater;
    private VideoDto video;
    private BigDecimal score;
    private String createdAt;
}
