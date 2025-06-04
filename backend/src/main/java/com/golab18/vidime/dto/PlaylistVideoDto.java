package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class PlaylistVideoDto {
    private Long id;
    private VideoDto video;
    private Integer position;
}
