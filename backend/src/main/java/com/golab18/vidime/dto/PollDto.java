package com.golab18.vidime.dto;

import lombok.Data;
import java.util.List;

@Data
public class PollDto {
    private Long id;
    private Long videoId;
    private List<PollOptionDto> options;
    private String textHeader;
    private Boolean isAnonymous;
    private String createdAt;
}
