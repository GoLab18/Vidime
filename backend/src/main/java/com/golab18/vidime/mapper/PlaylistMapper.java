package com.golab18.vidime.mapper;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.PlaylistDto;
import com.golab18.vidime.entity.Playlist;

@Mapper(componentModel = "spring", uses = {ChannelMapper.class, PlaylistVideoMapper.class}, imports = {Timestamp.class, Instant.class, UUID.class})
public interface PlaylistMapper {
    @Mapping(target = "uuid", expression = "java(playlist.getUuid().toString())")
    @Mapping(target = "createdAt", expression = "java(playlist.getCreatedAt() != null ? playlist.getCreatedAt().toString() : null)")
    PlaylistDto toDto(Playlist playlist);
    
    @Mapping(target = "uuid", expression = "java(playlistDto.getUuid() != null ? UUID.fromString(playlistDto.getUuid()) : null)")
    @Mapping(target = "createdAt", expression = "java(playlistDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(playlistDto.getCreatedAt())) : null)")
    Playlist toEntity(PlaylistDto playlistDto);
}
