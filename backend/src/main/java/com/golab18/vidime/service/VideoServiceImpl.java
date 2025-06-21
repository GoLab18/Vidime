package com.golab18.vidime.service;

import com.golab18.vidime.dto.TagCreateDto;
import com.golab18.vidime.dto.TagDto;
import com.golab18.vidime.dto.VideoCreateDto;
import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.Tag;
import com.golab18.vidime.entity.Video;
import com.golab18.vidime.entity.VideoTag;
import com.golab18.vidime.repository.VideoRepository;
import com.golab18.vidime.repository.ChannelRepository;
import com.golab18.vidime.repository.TagRepository;
import com.golab18.vidime.mapper.VideoMapper;
import com.golab18.vidime.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;
    private final ChannelRepository channelRepository;
    private final TagRepository tagRepository;
    private final VideoMapper videoMapper;

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

        videoRepository.save(video);
    }

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
    public List<VideoDto> getVideosByChannelId(Long channelId) {
        if (!channelRepository.existsById(channelId)) throw new ResourceNotFoundException("Channel", "id", channelId);

        List<Video> videos = videoRepository.findByChannelId(channelId);
        if (videos.isEmpty()) return Collections.emptyList();

        return videos.stream()
            .map(videoMapper::toDto)
            .collect(Collectors.toList());
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

        videoRepository.delete(video);
    }
}
