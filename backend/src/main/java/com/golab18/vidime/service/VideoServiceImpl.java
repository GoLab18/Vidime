package com.golab18.vidime.service;

import com.golab18.vidime.dto.AggregatedGlobalRatings;
import com.golab18.vidime.dto.StatsVideo;
import com.golab18.vidime.dto.TagCreateDto;
import com.golab18.vidime.dto.TagDto;
import com.golab18.vidime.dto.VideoCreateDto;
import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.dto.VideoSlimDto;
import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.Rating;
import com.golab18.vidime.entity.Tag;
import com.golab18.vidime.entity.Video;
import com.golab18.vidime.entity.VideoTag;
import com.golab18.vidime.repository.VideoRepository;
import com.golab18.vidime.repository.VideoViewRepository;
import com.golab18.vidime.repository.ChannelRepository;
import com.golab18.vidime.repository.TagRepository;
import com.golab18.vidime.mapper.VideoMapper;
import com.golab18.vidime.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final ChannelRepository channelRepository;
    private final VideoViewRepository videoViewRepository;
    private final TagRepository tagRepository;
    private final VideoMapper videoMapper;

    @Override
    public VideoDto getVideoById(Long id) {
        Video video = videoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Video", "id", id));
        return videoMapper.toDto(video);
    }

    @Override
    public VideoDto getVideoByUuid(UUID uuid) {
        Video video = videoRepository.findByUuid(uuid)
            .orElseThrow(() -> new ResourceNotFoundException("Video", "uuid", uuid));
        return videoMapper.toDto(video);
    }

    @Override
    public List<VideoSlimDto> getAllVideos(Sort sort) {
        List<Video> videos = videoRepository.findAll(sort);
        return videos.stream()
            .map(videoMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<VideoSlimDto> getMostViewedVideosAllTime() {
        List<Video> videos = videoRepository.findAll(Sort.by(Direction.DESC, "views"));
        return videos.stream()
            .map(videoMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<VideoSlimDto> getBestRatedVideosAllTime() {
        List<Video> videos = videoRepository.findAll(Sort.by(Direction.DESC, "bayesianRating"));
        return videos.stream()
            .map(videoMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override // ???
    public List<VideoSlimDto> getMostViewedVideosLastWeekDecayed() {
        List<Video> videos = videoRepository.findAll(Sort.by(Direction.DESC, "decayedViews"));
        return videos.stream()
            .map(videoMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<VideoSlimDto> getBestRatedVideosLastWeekDecayed() {
        List<Video> videos = videoRepository.findAll(Sort.by(Direction.DESC, "bayesianRatingWithTimeDecay"));
        return videos.stream()
            .map(videoMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<VideoSlimDto> getChannelVideos(Long channelId, Sort sort) {
        if (!channelRepository.existsById(channelId)) throw new ResourceNotFoundException("Channel", "id", channelId);

        List<Video> videos = videoRepository.findByChannelId(channelId, sort);
        if (videos.isEmpty()) return Collections.emptyList();

        return videos.stream()
            .map(videoMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override
    public List<StatsVideo> getStatsVideos(Long channelId, String start, String end) {
        Date startDate = Date.valueOf(start);
        Date endDate = Date.valueOf(end);
        return videoRepository.getStatsVideos(channelId, startDate, endDate);
    }
    
    @Override
    @Transactional
    public void createVideo(VideoCreateDto videoCreateDto) {
        if (!channelRepository.existsById(videoCreateDto.getChannelId())) {
            throw new ResourceNotFoundException("Channel", "id", videoCreateDto.getChannelId());
        }

        Video video = videoMapper.createToEntity(videoCreateDto);

        Set<VideoTag> videoTags = new HashSet<>();

        for (TagCreateDto tagCreateDto : videoCreateDto.getTags()) {
            String tagName = tagCreateDto.getName();

            Tag tag = tagRepository.getTagByName(tagName)
                .orElseGet(() -> {
                    Tag newTag = new Tag();
                    newTag.setName(tagName);
                    return tagRepository.save(newTag);
                });

            VideoTag videoTag = new VideoTag();
            videoTag.setVideo(video);
            videoTag.setTag(tag);

            videoTags.add(videoTag);
        }

        video.setTags(videoTags);

        channelRepository.incrementVideosAmount(video.getChannel().getId());

        videoRepository.save(video);
    }

    @Override
    @Transactional
    public void updateVideo(Long id, VideoDto videoDto) {
        Video existingVideo = videoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Video", "id", id));
    
        existingVideo.setTitle(videoDto.getTitle());
        existingVideo.setDescription(videoDto.getDescription());
        existingVideo.setCdnUrl(videoDto.getCdnUrl());
        existingVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        existingVideo.setDuration(videoDto.getDuration());
    
        existingVideo.getTags().clear();
    
        Set<VideoTag> updatedVideoTags = new HashSet<>();
        Set<String> seenTagNames = new HashSet<>();
    
        for (TagDto tagDto : videoDto.getTags()) {
            if (tagDto.getName() != null && !seenTagNames.add(tagDto.getName().toLowerCase())) continue;
    
            Tag tag;
            if (tagDto.getId() != null) {
                tag = tagRepository.findById(tagDto.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Tag", "id", tagDto.getId()));
            } else {
                tag = tagRepository.getTagByName(tagDto.getName())
                    .orElseGet(() -> {
                        Tag newTag = new Tag();
                        newTag.setName(tagDto.getName());
                        return tagRepository.save(newTag);
                    });
            }
    
            VideoTag videoTag = new VideoTag();
            videoTag.setVideo(existingVideo);
            videoTag.setTag(tag);
    
            updatedVideoTags.add(videoTag);
        }
    
        existingVideo.getTags().addAll(updatedVideoTags);
    
        videoRepository.save(existingVideo);
    }

    @Override
    @Transactional
    public void deleteVideo(Long id) {
        Video video = videoRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Video", "id", id));

        channelRepository.decrementVideosAmount(video.getChannel().getId());

        videoRepository.delete(video);
    }

    @Override
    public void updateBayesianRatings() {
        AggregatedGlobalRatings agr = videoRepository.getAggregatedGlobalRatings();
        if (agr.getTotalRatingsCount() == 0) return;

        // m calculation -> global average rating
        float m = agr.getTotalRatingsSum().floatValue() / agr.getTotalRatingsCount();

        // C calculation -> confidence level = 25th percentile of ratingsAmount
        List<Integer> ratingsAmounts = videoRepository.getRatingsAmountsSortedAsc();
        if (ratingsAmounts.isEmpty()) return;
    
        int index = (int) Math.floor(ratingsAmounts.size() * 0.25);
        float C = ratingsAmounts.get(Math.min(index, ratingsAmounts.size() - 1));

        // Batch processing
        int page = 0;
        final int batchSize = 100;
        Page<Video> videoPage;
    
        while (true) {
            videoPage = videoRepository.findAll(PageRequest.of(page, batchSize));
            updateRatingsBatch(videoPage.getContent(), m, C);
    
            if (!videoPage.hasNext()) break;
            page++;
        }
    }
    
    @Transactional
    public void updateRatingsBatch(List<Video> videos, float m, float C) {
        videos.forEach(video -> video.calculateBayesianRating(m, C));
        videoRepository.saveAll(videos);
    }

    @Override
    public void updateTimeDecayedBayesianRatings() {
        AggregatedGlobalRatings agr = videoRepository.getAggregatedGlobalRatings();
        if (agr.getTotalRatingsCount() == 0) return;

        // m calculation -> global average rating
        float m = agr.getTotalRatingsSum().floatValue() / agr.getTotalRatingsCount();

        // C calculation -> confidence level = 25th percentile of ratingsAmount
        List<Integer> ratingsAmounts = videoRepository.getRatingsAmountsSortedAsc();
        if (ratingsAmounts.isEmpty()) return;

        int index = (int) Math.floor(ratingsAmounts.size() * 0.25);
        float C = ratingsAmounts.get(Math.min(index, ratingsAmounts.size() - 1));

        // Decay constant -> Half-life = 7 days -> lambda = ln(2) / 7
        final double lambda = Math.log(2) / 7.0;

        int page = 0;
        final int batchSize = 100;
        Page<Long> videosIdsPage;

        while (true) {
            videosIdsPage = videoRepository.findVideoIds(PageRequest.of(page, batchSize));
            if (videosIdsPage.isEmpty()) break;

            List<Video> videos = videoRepository.findAllWithRatingsByIdIn(videosIdsPage.getContent());

            updateTimeDecayedRatingsBatch(videos, m, C, lambda);
    
            if (!videosIdsPage.hasNext()) break;
            page++;
        }
    }

    @Transactional
    public void updateTimeDecayedRatingsBatch(List<Video> videos, float m, float C, double lambda) {
        final long now = System.currentTimeMillis();
        final long millisPerDay = 1000L * 60 * 60 * 24;

        for (Video video : videos) {
            List<Rating> ratings = video.getRatings();
            if (ratings == null || ratings.isEmpty()) continue;

            double weightedSum = 0.0;
            double weightTotal = 0.0;

            for (Rating rating : ratings) {
                long ageInDays = Math.max(0, (now - rating.getCreatedAt().getTime()) / millisPerDay);
                double weight = Math.exp(-lambda * ageInDays);

                weightedSum += rating.getScore().doubleValue() * weight;
                weightTotal += weight;
            }

            float decayedAvg = (float) (weightTotal > 0 ? weightedSum / weightTotal : 0);
            float decayedCount = (float) weightTotal;

            video.calculateTimeDecayedBayesianRating(decayedAvg, decayedCount, m, C);
        }

        videoRepository.saveAll(videos);
    }

    @Override
    public void updateDecayedViews() {
        final int batchSize = 100;
        int page = 0;
        Page<Long> videoIdsPage;

        while (true) {
            videoIdsPage = videoRepository.findVideoIds(PageRequest.of(page, batchSize));
            if (videoIdsPage.getContent().isEmpty()) break;

            processDecayedViewsBatch(videoIdsPage.getContent());

            if (!videoIdsPage.hasNext()) break;
            page++;
        }
    }

    @Transactional
    public void processDecayedViewsBatch(List<Long> videoIds) {
        final double lambda = Math.log(2) / 7.0;
        final long now = System.currentTimeMillis();
        final long millisPerDay = 1000L * 60 * 60 * 24;

        List<Object[]> viewsData = videoViewRepository.findViewsByVideoIds(videoIds);

        Map<Long, List<Timestamp>> viewsByVideo = new HashMap<>();
        for (Object[] row : viewsData) {
            Long videoId = (Long) row[0];
            Timestamp viewedAt = (Timestamp) row[1];
            viewsByVideo.computeIfAbsent(videoId, k -> new ArrayList<>()).add(viewedAt);
        }

        for (Long videoId : videoIds) {
            List<Timestamp> timestamps = viewsByVideo.getOrDefault(videoId, Collections.emptyList());

            double totalWeight = 0.0;
            for (Timestamp viewedAt : timestamps) {
                long ageInDays = Math.max(0, (now - viewedAt.getTime()) / millisPerDay);
                double weight = Math.exp(-lambda * ageInDays);
                totalWeight += weight;
            }

            float decayedViewScore = (float) totalWeight;

            videoRepository.updateDecayedViews(videoId, decayedViewScore);
        }
    }
}