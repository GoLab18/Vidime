package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class VideoTagDto {
    private Long id;
    private VideoDto video;
    private TagDto tag;
}
