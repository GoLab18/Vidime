package com.golab18.vidime.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.golab18.vidime.dto.HistoryVideo;
import com.golab18.vidime.service.WatchHistoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/watch-history")
@RequiredArgsConstructor
public class WatchHistoryController {
    
    private final WatchHistoryService watchHistoryService;

    @GetMapping("/batch/{viewerId}")
    public Page<HistoryVideo> fetchWatchHistoryVideosBatch(
        @PathVariable Long viewerId,
        @RequestParam(required = false) String before,
        @PageableDefault(page = 0, size = 20) Pageable pageable
    ) {
        return watchHistoryService.fetchWatchHistoryVideosBatch(viewerId, before, pageable);
    }
}
