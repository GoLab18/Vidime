package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;

import com.golab18.vidime.dto.VideoDto;
import com.golab18.vidime.entity.Video;
import com.golab18.vidime.mapper.ChannelMapper;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class, TagMapper.class})
public interface VideoMapper {
    VideoDto toDto(Video video);
    
    Video toEntity(VideoDto videoDto);
}
