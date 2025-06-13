package com.golab18.vidime.service;

import java.util.List;

import com.golab18.vidime.dto.CommentDto;

public interface CommentService {
    List<CommentDto> getCommentsByVideoId(Long videoId);
    CommentDto saveComment(CommentDto commentDto);
    void deleteComment(Long id);
}
