package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.golab18.vidime.dto.PollVoteDto;
import com.golab18.vidime.entity.PollVote;
import java.sql.Timestamp;
import java.time.Instant;

@Mapper(componentModel = "spring", uses = ChannelMapper.class, imports = {Timestamp.class, Instant.class})
public interface PollVoteMapper {
    @Mapping(target = "pollId", source = "poll.id")
    @Mapping(target = "optionId", source = "option.id")
    @Mapping(target = "votedAt", expression = "java(pollVote.getVotedAt() != null ? pollVote.getVotedAt().toString() : null)")
    PollVoteDto toDto(PollVote pollVote);

    @Mapping(target = "poll", ignore = true)
    @Mapping(target = "voter", ignore = true)
    @Mapping(target = "option", ignore = true)
    @Mapping(target = "votedAt", expression = "java(pollVoteDto.getVotedAt() != null ? Timestamp.from(Instant.parse(pollVoteDto.getVotedAt())) : null)")
    PollVote toEntity(PollVoteDto pollVoteDto);
}
