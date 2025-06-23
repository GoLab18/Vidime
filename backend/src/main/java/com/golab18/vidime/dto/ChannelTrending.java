package com.golab18.vidime.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class ChannelTrending {
    private Long id;
    private String uuid;
    private String name;
    private String picture;
    private boolean verified;
    private Integer subscribersCount;
    private Long viewsAllTime;

    public ChannelTrending(Long id, UUID uuid, String name, String picture, boolean verified, Integer subscribersCount, Long viewsAllTime) {
        this.id = id;
        this.uuid = uuid.toString();
        this.name = name;
        this.picture = picture;
        this.verified = verified;
        this.subscribersCount = subscribersCount;
        this.viewsAllTime = viewsAllTime;
    }
}
