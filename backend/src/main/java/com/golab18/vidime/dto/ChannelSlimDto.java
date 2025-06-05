package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class ChannelSlimDto {
    private Long id;
    private String uuid;
    private String name;
    private String picture;
    private boolean verified;
}
