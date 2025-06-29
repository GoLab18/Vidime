package com.golab18.vidime.service;

import java.sql.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.golab18.vidime.dto.DailyAggregation;
import com.golab18.vidime.dto.VideoViewCreate;
import com.golab18.vidime.entity.VideoView;
import com.golab18.vidime.mapper.VideoViewMapper;
import com.golab18.vidime.repository.VideoViewRepository;
import com.golab18.vidime.repository.WatchHistoryRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoViewServiceImpl implements VideoViewService {

    private final VideoViewRepository videoViewRepository;
    private final WatchHistoryRepository watchHistoryRepository;
    private final VideoViewMapper videoViewMapper;
    
    @Override
    @Transactional
    public void handleVideoViewEvent(VideoViewCreate videoViewCreate) {
        VideoView videoView = videoViewMapper.toEntity(videoViewCreate);
        videoViewRepository.incrementViews(videoViewCreate.getVideoId());

        Date watchedDate = new Date(videoView.getViewedAt().getTime());

        if (videoView.getViewer() != null) {
            watchHistoryRepository.upsertWatchHistory(videoView.getViewer().getId(), videoView.getVideo().getId(), watchedDate, videoView.getViewedAt());
        }
        
        videoViewRepository.save(videoView);
    }

    @Override
    @Transactional
    public List<DailyAggregation> countViewsByChannelPerDay(Long channelId, String start, String end) {
        Date startDate = Date.valueOf(start);
        Date endDate = Date.valueOf(end);
        List<Object[]> buckets = videoViewRepository.countViewsByChannelPerDay(channelId, startDate, endDate);

        return buckets.stream()
            .map(row -> new DailyAggregation(
                Date.valueOf(row[0].toString()),
                ((Long) row[1])
            ))
            .collect(Collectors.toList());
    }
}
