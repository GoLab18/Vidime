package com.golab18.vidime.dto;

import java.sql.Date;
import java.sql.Timestamp;

import lombok.Data;

@Data
public class WatchHistoryDto {
    private Long id;
    private Long viewerId;
    private VideoDto video;
    private String watchedDate;
    private String lastWatchedAt;
}
