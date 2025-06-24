package com.golab18.vidime.service;

import com.golab18.vidime.dto.VideoViewCreate;

public interface VideoViewService {
    void handleVideoViewEvent(VideoViewCreate videoViewCreate);
}
