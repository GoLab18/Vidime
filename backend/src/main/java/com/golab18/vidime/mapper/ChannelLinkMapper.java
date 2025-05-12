package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;

import com.golab18.vidime.dto.ChannelLinkDto;
import com.golab18.vidime.entity.ChannelLink;

@Mapper(componentModel = "spring")
public interface ChannelLinkMapper {
    ChannelLinkDto toDto(ChannelLink channelLink);

    ChannelLink toEntity(ChannelLinkDto channelLinkDto);
}
