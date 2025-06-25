package com.golab18.vidime.dto;

import java.util.UUID;

import lombok.Data;

@Data
public class ChannelSlimDto {
    private Long id;
    private String uuid;
    private String name;
    private String picture;
    private Long userId;
    private boolean verified;

    public ChannelSlimDto(Long id, UUID uuid, String name, String picture, Long userId, boolean verified) {
        this.id = id;
        this.uuid = uuid.toString();
        this.name = name;
        this.picture = picture;
        this.userId = userId;
        this.verified = verified;
    }
}
