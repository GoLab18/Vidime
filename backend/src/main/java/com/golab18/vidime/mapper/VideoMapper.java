package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.entity.Video;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class, TagMapper.class}, imports = {Timestamp.class, Instant.class, UUID.class})
public interface VideoMapper {
    @Mapping(target = "uuid", expression = "java(video.getUuid().toString())")
    @Mapping(target = "addedAt", expression = "java(video.getAddedAt() != null ? video.getAddedAt().toString() : null)")
    VideoDto toDto(Video video);
    
    @Mapping(target = "uuid", expression = "java(videoDto.getUuid() != null ? UUID.fromString(videoDto.getUuid()) : null)")
    @Mapping(target = "addedAt", expression = "java(videoDto.getAddedAt() != null ? Timestamp.from(Instant.parse(videoDto.getAddedAt())) : null)")
    Video toEntity(VideoDto videoDto);
}
