package com.golab18.vidime.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.golab18.vidime.dto.DailyAggregation;
import com.golab18.vidime.dto.VideoViewCreate;
import com.golab18.vidime.service.VideoViewService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/views")
@RequiredArgsConstructor
public class ViewController {
    
    private final VideoViewService videoViewService;

    @GetMapping("/count/{channelId}")
    public ResponseEntity<List<DailyAggregation>> countViewsByChannelPerDay(
        @PathVariable Long channelId,
        @RequestParam String start,
        @RequestParam String end
    ) {
        List<DailyAggregation> viewCounts = videoViewService.countViewsByChannelPerDay(channelId, start, end);
        return ResponseEntity.ok(viewCounts);
    }

    @PostMapping("/increment")
    public ResponseEntity<Void> incrementViews(@RequestBody VideoViewCreate videoViewCreate) {
        videoViewService.handleVideoViewEvent(videoViewCreate);
        return ResponseEntity.ok().build();
    }
}
