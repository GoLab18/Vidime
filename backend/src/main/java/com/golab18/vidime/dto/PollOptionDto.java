package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class PollOptionDto {
    private Long id;
    private Long pollId;
    private String optionText;
    private Integer votes;
    // private Float votesPercentage; TODO (?)
}
