package com.golab18.vidime.service;

import java.util.List;

import com.golab18.vidime.dto.DailyAggregation;
import com.golab18.vidime.dto.VideoViewCreate;

public interface VideoViewService {
    void handleVideoViewEvent(VideoViewCreate videoViewCreate);
    List<DailyAggregation> countViewsByChannelPerDay(Long channelId, String start, String end);
}
