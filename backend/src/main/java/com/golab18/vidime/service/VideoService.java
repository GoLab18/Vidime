package com.golab18.vidime.service;

import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.dto.VideoSlimDto;
import org.springframework.data.domain.Sort;
import com.golab18.vidime.dto.VideoCreateDto;
import java.util.List;
import java.util.UUID;

public interface VideoService {
    void createVideo(VideoCreateDto videoDto);
    VideoDto getVideoById(Long id);
    VideoDto getVideoByUuid(UUID uuid);
    List<VideoSlimDto> getAllVideos(Sort sort);
    List<VideoSlimDto> getMostViewedVideosAllTime();
    List<VideoSlimDto> getBestRatedVideosAllTime();
    List<VideoSlimDto> getMostViewedVideosLastWeekDecayed();
    List<VideoSlimDto> getBestRatedVideosLastWeekDecayed();
    List<VideoSlimDto> getChannelVideos(Long channelId, Sort sort);
    void updateVideo(Long id, VideoDto videoDto);
    void deleteVideo(Long id);
    void updateBayesianRatings();
    void updateTimeDecayedBayesianRatings();
    void updateDecayedViews();
}

