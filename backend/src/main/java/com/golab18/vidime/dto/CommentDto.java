package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class CommentDto {
    private Long id;
    private ChannelDto channel;
    private Long videoId;
    private String content;
    private Integer likes;
    private Integer dislikes;
    private Integer repliesAmount;
    private String createdAt;
}
