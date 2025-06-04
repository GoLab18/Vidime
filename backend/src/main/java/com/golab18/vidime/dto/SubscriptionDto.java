package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class SubscriptionDto {
    private Long id;
    private ChannelDto subscriber;
    private ChannelDto channel;
    private String subscribedAt;
}
