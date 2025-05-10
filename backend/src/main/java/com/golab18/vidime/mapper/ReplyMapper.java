package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.sql.Timestamp;
import java.time.Instant;

import com.golab18.vidime.dto.ReplyDto;
import com.golab18.vidime.entity.Reply;

@Mapper(componentModel = "spring", uses = {CommentMapper.class, ChannelMapper.class}, imports = {Timestamp.class, Instant.class})
public interface ReplyMapper {
    @Mapping(target = "createdAt", expression = "java(reply.getCreatedAt() != null ? reply.getCreatedAt().toString() : null)")
    ReplyDto toDto(Reply reply);

    @Mapping(target = "createdAt", expression = "java(replyDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(replyDto.getCreatedAt())) : null)")
    Reply toEntity(ReplyDto replyDto);
}
