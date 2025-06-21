package com.golab18.vidime.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golab18.vidime.dto.VideoCreateDto;
import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.service.VideoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/{id}")
    public ResponseEntity<VideoDto> getVideoById(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }
    
    @GetMapping("/{uuid}")
    public ResponseEntity<VideoDto> getVideoByUuid(@PathVariable UUID uuid) {
        return ResponseEntity.ok(videoService.getVideoByUuid(uuid));
    }

    @PostMapping("/{id}")
    public ResponseEntity<Void> updateVideo(@PathVariable Long id, @RequestBody VideoDto videoDto) {
        videoService.updateVideo(id, videoDto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createVideo(@RequestBody VideoCreateDto videoCreateDto) {
        videoService.createVideo(videoCreateDto);
        return ResponseEntity.noContent().build();
    }
}
