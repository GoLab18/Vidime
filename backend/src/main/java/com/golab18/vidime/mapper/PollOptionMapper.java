package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.PollOptionDto;
import com.golab18.vidime.entity.PollOption;

@Mapper(componentModel = "spring")
public interface PollOptionMapper {
    @Mapping(target = "pollId", source = "poll.id")
    PollOptionDto toDto(PollOption pollOption);

    @Mapping(target = "poll", ignore = true)
    PollOption toEntity(PollOptionDto pollOptionDto);
}
