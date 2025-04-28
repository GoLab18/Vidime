package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.Instant;

import com.golab18.vidime.dto.CommentDto;
import com.golab18.vidime.entity.Comment;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class}, imports = {Timestamp.class, Instant.class})
public interface CommentMapper {
    @Mapping(target = "videoId", source = "video.id")
    @Mapping(target = "createdAt", expression = "java(comment.getCreatedAt() != null ? comment.getCreatedAt().toString() : null)")
    CommentDto toDto(Comment comment);

    @Mapping(target = "video.id", source = "videoId")
    @Mapping(target = "createdAt", expression = "java(commentDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(commentDto.getCreatedAt())) : null)")
    Comment toEntity(CommentDto commentDto);
}
