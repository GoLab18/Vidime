package com.golab18.vidime.service;

import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.dto.VideoCreateDto;
import java.util.List;
import java.util.UUID;

public interface VideoService {
    void createVideo(VideoCreateDto videoDto);
    VideoDto getVideoById(Long id);
    VideoDto getVideoByUuid(UUID uuid);
    List<VideoDto> getVideosByChannelId(Long channelId);
    void updateVideo(Long id, VideoDto videoDto);
    void deleteVideo(Long id);
}

