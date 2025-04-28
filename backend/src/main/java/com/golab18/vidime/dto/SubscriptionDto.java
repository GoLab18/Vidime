package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class SubscriptionDto {
    private Long id;
    private UserDto subscriber;
    private ChannelDto channel;
    private String subscribedAt;
}
