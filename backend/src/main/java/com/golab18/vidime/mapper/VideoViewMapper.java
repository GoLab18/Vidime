package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.VideoViewCreate;
import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.Video;
import com.golab18.vidime.entity.VideoView;

@Mapper(componentModel = "spring", imports = {Channel.class, Video.class})
public interface VideoViewMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "viewer", expression = "java(videoViewCreate.getViewerId() != null ? new Channel(videoViewCreate.getViewerId()) : null)")
    @Mapping(target = "video", expression = "java(videoViewCreate.getVideoId() != null ? new Video(videoViewCreate.getVideoId()) : null)")
    @Mapping(target = "viewedAt", ignore = true)
    VideoView toEntity(VideoViewCreate videoViewCreate);
}
