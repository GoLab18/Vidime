package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class SavedPlaylistDto {
    private Long id;
    private Long saverId;
    private PlaylistDto playlist;
    private String savedAt;
}
