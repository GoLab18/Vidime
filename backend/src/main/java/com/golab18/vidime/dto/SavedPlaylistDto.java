package com.golab18.vidime.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class SavedPlaylistDto {
    private Long id;
    private Long saverId;
    private PlaylistDto playlist;
    private String savedAt;
}
