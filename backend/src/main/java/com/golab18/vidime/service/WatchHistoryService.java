package com.golab18.vidime.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.golab18.vidime.dto.HistoryVideo;

public interface WatchHistoryService {
    Page<HistoryVideo> fetchWatchHistoryVideosBatch(Long viewerId, String before, Pageable pageable);
}
