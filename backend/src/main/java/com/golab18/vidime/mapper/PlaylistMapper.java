package com.golab18.vidime.mapper;

import java.sql.Timestamp;
import java.time.Instant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.PlaylistDto;
import com.golab18.vidime.entity.Playlist;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class, PlaylistVideoMapper.class}, imports = {Timestamp.class, Instant.class})
public interface PlaylistMapper {
    @Mapping(target = "createdAt", expression = "java(playlist.getCreatedAt() != null ? playlist.getCreatedAt().toString() : null)")
    PlaylistDto toDto(Playlist playlist);
    
    @Mapping(target = "createdAt", expression = "java(playlistDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(playlistDto.getCreatedAt())) : null)")
    Playlist toEntity(PlaylistDto playlistDto);
}
