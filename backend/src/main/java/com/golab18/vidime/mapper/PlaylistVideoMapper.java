package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.PlaylistVideoDto;
import com.golab18.vidime.entity.PlaylistVideo;

@Mapper(componentModel = "spring", uses = {VideoMapper.class, PlaylistMapper.class})
public interface PlaylistVideoMapper {
    PlaylistVideoDto toDto(PlaylistVideo playlistVideo);
    
    PlaylistVideo toEntity(PlaylistVideoDto playlistVideoDto);
}
