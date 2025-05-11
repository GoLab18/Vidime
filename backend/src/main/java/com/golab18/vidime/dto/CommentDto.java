package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private ChannelDto channel;
    private Long videoId;
    private Integer likes;
    private Integer dislikes;
    private String content;
    private String createdAt;
}
