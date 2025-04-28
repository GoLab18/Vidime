package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class PollVoteDto {
    private Long id;
    private Long pollId;
    private ChannelDto voter;
    private Long optionId;
    private String votedAt;
}
