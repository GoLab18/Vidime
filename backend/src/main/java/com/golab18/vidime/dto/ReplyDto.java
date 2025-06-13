package com.golab18.vidime.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class ReplyDto {
 private Long id;   
 private ChannelDto replier;
 private CommentDto parentComment;
 private Integer likes;
 private Integer dislikes;
 private String content;
 private String createdAt;
}