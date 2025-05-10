package com.golab18.vidime.dto;

import java.sql.Timestamp;

import lombok.Data;

@Data
public class ReplyDto {
 private Long id;   
 private ChannelDto channel;
 private CommentDto parentComment;
 private String content;
 private String createdAt;
}