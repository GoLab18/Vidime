package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.entity.Video;
import com.golab18.vidime.dto.TagDto;
import com.golab18.vidime.dto.VideoCreateDto;
import com.golab18.vidime.entity.VideoTag;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class, TagMapper.class}, imports = {Timestamp.class, Instant.class, UUID.class})
public interface VideoMapper {
    @Mapping(target = "uuid", expression = "java(video.getUuid().toString())")
    @Mapping(target = "addedAt", expression = "java(video.getAddedAt() != null ? video.getAddedAt().toString() : null)")
    VideoDto toDto(Video video);

    @Mapping(source = "tag.id", target = "id")
    @Mapping(source = "tag.name", target = "name")
    TagDto mapVideoTagToTagDto(VideoTag videoTag);
    
    @Mapping(target = "uuid", expression = "java(videoDto.getUuid() != null ? UUID.fromString(videoDto.getUuid()) : null)")
    @Mapping(target = "addedAt", expression = "java(videoDto.getAddedAt() != null ? Timestamp.from(Instant.parse(videoDto.getAddedAt())) : null)")
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "polls", ignore = true)
    @Mapping(target = "watchHistories", ignore = true)
    @Mapping(target = "playlistEntries", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "videoViews", ignore = true)
    Video toEntity(VideoDto videoDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "uuid", ignore = true)
    @Mapping(target = "channel", expression = "java(videoCreateDto.getChannelId() != null ? new Channel(videoCreateDto.getChannelId()) : null)")
    @Mapping(target = "views", ignore = true)
    @Mapping(target = "ratingsAmount", ignore = true)
    @Mapping(target = "avgRating", ignore = true)
    @Mapping(target = "addedAt", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "polls", ignore = true)
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "watchHistories", ignore = true)
    @Mapping(target = "playlistEntries", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "videoViews", ignore = true)
    Video createToEntity(VideoCreateDto videoCreateDto);
}
