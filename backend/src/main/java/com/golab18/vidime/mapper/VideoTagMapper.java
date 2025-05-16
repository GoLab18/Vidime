package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;

import com.golab18.vidime.dto.VideoTagDto;
import com.golab18.vidime.entity.VideoTag;

@Mapper(componentModel = "spring", uses = {VideoMapper.class, TagMapper.class})
public interface VideoTagMapper {
    VideoTagDto toDto(VideoTag videoTag);
    
    VideoTag toEntity(VideoTagDto videoTagDto);
}
