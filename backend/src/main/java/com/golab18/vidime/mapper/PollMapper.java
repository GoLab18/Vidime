package com.golab18.vidime.mapper;

import java.sql.Timestamp;
import java.time.Instant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.PollDto;
import com.golab18.vidime.entity.Poll;

@Mapper(componentModel = "spring", uses = {PollOptionMapper.class}, imports = {Timestamp.class, Instant.class})
public interface PollMapper {
    @Mapping(target = "videoId", source = "video.id")
    @Mapping(target = "createdAt", expression = "java(poll.getCreatedAt() != null ? poll.getCreatedAt().toString() : null)")
    PollDto toDto(Poll poll);

    @Mapping(target = "video", ignore = true)
    @Mapping(target = "createdAt", expression = "java(pollDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(pollDto.getCreatedAt())) : null)")
    Poll toEntity(PollDto pollDto);
}
