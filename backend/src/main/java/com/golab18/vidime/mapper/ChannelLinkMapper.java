package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.ChannelLinkDto;
import com.golab18.vidime.entity.ChannelLink;

@Mapper(componentModel = "spring")
public interface ChannelLinkMapper {
    @Mapping(target = "channelId", source = "channel.id")
    ChannelLinkDto toDto(ChannelLink channelLink);

    @Mapping(target = "channel", expression = "java(channelLinkDto.getChannelId() != null ? new Channel(channelLinkDto.getChannelId()) : null)")
    ChannelLink toEntity(ChannelLinkDto channelLinkDto);
}
