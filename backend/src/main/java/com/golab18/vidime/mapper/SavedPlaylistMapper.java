package com.golab18.vidime.mapper;

import java.sql.Timestamp;
import java.time.Instant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.SavedPlaylistDto;
import com.golab18.vidime.entity.SavedPlaylist;

@Mapper(componentModel = "spring", uses = {PlaylistMapper.class, ChannelMapper.class}, imports = {Timestamp.class, Instant.class})
public interface SavedPlaylistMapper {
    @Mapping(target = "saverId", source = "saver.id")
    @Mapping(target = "savedAt", expression = "java(savedPlaylist.getSavedAt() != null ? savedPlaylist.getSavedAt().toString() : null)")
    SavedPlaylistDto toDto(SavedPlaylist savedPlaylist);

    @Mapping(target = "saver", expression = "java(savedPlaylistDto.getSaverId() != null ? new Channel(savedPlaylistDto.getSaverId()) : null)")
    @Mapping(target = "savedAt", expression = "java(Timestamp.from(Instant.parse(savedPlaylistDto.getSavedAt())))")
    SavedPlaylist toEntity(SavedPlaylistDto savedPlaylistDto);
}
