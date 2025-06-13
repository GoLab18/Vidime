package com.golab18.vidime.controller;

import com.golab18.vidime.dto.CommentDto;
import com.golab18.vidime.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/video/{id}")
    public List<CommentDto> getCommentsByVideoId(@PathVariable Long id) {
        return commentService.getCommentsByVideoId(id);
    }

    @PostMapping
    public CommentDto addComment(@RequestBody CommentDto comment) {
        return commentService.saveComment(comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
    }
}
