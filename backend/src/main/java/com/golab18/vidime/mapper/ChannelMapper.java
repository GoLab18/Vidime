package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;

import com.golab18.vidime.dto.ChannelDto;
import com.golab18.vidime.entity.Channel;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ChannelMapper {
    ChannelDto toDto(Channel channel);
    
    Channel toEntity(ChannelDto channelDto);
}
