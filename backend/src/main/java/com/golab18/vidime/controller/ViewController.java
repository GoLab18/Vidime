package com.golab18.vidime.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golab18.vidime.dto.VideoViewCreate;
import com.golab18.vidime.service.VideoViewService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/views")
@RequiredArgsConstructor
public class ViewController {
    
    private final VideoViewService videoViewService;

    @PostMapping("/increment")
    public ResponseEntity<Void> incrementViews(@RequestBody VideoViewCreate videoViewCreate) {
        videoViewService.handleVideoViewEvent(videoViewCreate);
        return ResponseEntity.ok().build();
    }
    
}
