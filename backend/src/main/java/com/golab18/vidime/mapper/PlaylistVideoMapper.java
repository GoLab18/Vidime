package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.PlaylistVideoDto;
import com.golab18.vidime.entity.PlaylistVideo;

@Mapper(componentModel = "spring", uses = {VideoMapper.class})
public interface PlaylistVideoMapper {
    PlaylistVideoDto toDto(PlaylistVideo playlistVideo);
    
    @Mapping(target = "playlist", ignore = true)
    PlaylistVideo toEntity(PlaylistVideoDto playlistVideoDto);
}
