package com.golab18.vidime.service;

import java.sql.Timestamp;
import java.time.Instant;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.golab18.vidime.dto.HistoryVideo;
import com.golab18.vidime.repository.WatchHistoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WatchHistoryServiceImpl implements WatchHistoryService {
    
    private final WatchHistoryRepository watchHistoryRepository;

    @Override
    public Page<HistoryVideo> fetchWatchHistoryVideosBatch(Long viewerId, String before, Pageable pageable) {
        return watchHistoryRepository.fetchWatchHistoryData(
            viewerId,
            (before != null) ? Timestamp.from(Instant.parse(before)) : null,
            pageable
        );
    }
}
