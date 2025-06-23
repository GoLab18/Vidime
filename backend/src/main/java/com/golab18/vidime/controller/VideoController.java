package com.golab18.vidime.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golab18.vidime.dto.VideoCreateDto;
import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.dto.VideoSlimDto;
import com.golab18.vidime.service.VideoService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    @GetMapping("/id/{id}")
    public ResponseEntity<VideoDto> getVideoById(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }
    
    @GetMapping("/uuid/{uuid}")
    public ResponseEntity<VideoDto> getVideoByUuid(@PathVariable UUID uuid) {
        return ResponseEntity.ok(videoService.getVideoByUuid(uuid));
    }

    @GetMapping("/all")
    public ResponseEntity<List<VideoSlimDto>> getAllVideos(Sort sort) {
        return ResponseEntity.ok(videoService.getAllVideos(sort));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<VideoSlimDto>> getTrendingVideos() {
        return ResponseEntity.ok(videoService.getMostViewedVideosAllTime());
    }

    @GetMapping("/trending/week")
    public ResponseEntity<List<VideoSlimDto>> getTrendingVideosLastWeek() {
        return ResponseEntity.ok(videoService.getMostViewedVideosLastWeekDecayed());
    }

    @GetMapping("/best-rated")
    public ResponseEntity<List<VideoSlimDto>> getBestRatedVideos() {
        return ResponseEntity.ok(videoService.getBestRatedVideosAllTime());
    }

    @GetMapping("/best-rated/week")
    public ResponseEntity<List<VideoSlimDto>> getBestRatedVideosLastWeek() {
        return ResponseEntity.ok(videoService.getBestRatedVideosLastWeekDecayed());
    }

    @GetMapping("/channel/{channelId}")
    public ResponseEntity<List<VideoSlimDto>> getChannelVideos(@PathVariable Long channelId, Sort sort) {
        return ResponseEntity.ok(videoService.getChannelVideos(channelId, sort));
    }

    @PostMapping("/update/{id}")
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
