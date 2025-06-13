package com.golab18.vidime.service;

import com.golab18.vidime.dto.CommentDto;
import com.golab18.vidime.mapper.CommentMapper;
import com.golab18.vidime.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final CommentMapper commentMapper;

    @Override
    public List<CommentDto> getCommentsByVideoId(Long videoId) {
        return commentRepository.findByVideoId(videoId)
            .stream()
            .map(commentMapper::toDto)
            .toList();
    }

    @Override
    public CommentDto saveComment(CommentDto commentDto) {
        return commentMapper.toDto(commentRepository.save(commentMapper.toEntity(commentDto)));
    }

    @Override
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}
