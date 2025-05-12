package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class ChannelLinkDto {
    private Long id;
    private Long channelId;
    private String title;
    private String url;
    private Integer position;
}
