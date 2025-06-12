package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class ChannelCreateDto {
    private String name;
    private String picture;
    private String description;
    private Long userId;
}
