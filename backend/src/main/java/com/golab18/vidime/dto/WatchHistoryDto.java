package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class WatchHistoryDto {
    private Long id;
    private Long viewerId;
    private VideoDto video;
    private String watchedDate;
    private String lastWatchedAt;
}
