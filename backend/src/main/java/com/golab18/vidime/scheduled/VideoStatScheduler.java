package com.golab18.vidime.scheduled;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.golab18.vidime.service.VideoService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class VideoStatScheduler {
    
    private final VideoService videoService;

    @Scheduled(cron = "0 */10 * * * ?")
    public void periodicBayesianRatingUpdate() {
        videoService.updateBayesianRatings();
    }

    @Scheduled(cron = "0 */10 * * * ?")
    public void periodicTimeDecayedBayesianRatingUpdate() {
        videoService.updateTimeDecayedBayesianRatings();
    }

    @Scheduled(cron = "0 */10 * * * ?")
    public void periodicDecayedViewsUpdate() {
        videoService.updateDecayedViews();
    }
}
