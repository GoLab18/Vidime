package com.golab18.vidime.mapper;

import java.sql.Timestamp;
import java.time.Instant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.golab18.vidime.dto.SavedPlaylistDto;
import com.golab18.vidime.entity.SavedPlaylist;

@Mapper(componentModel = "spring", uses = {PlaylistMapper.class}, imports = {Timestamp.class, Instant.class})
public interface SavedPlaylistMapper {
    @Mapping(target = "savedAt", expression = "java(savedPlaylist.getSavedAt() != null ? savedPlaylist.getSavedAt().toString() : null)")
    SavedPlaylistDto toDto(SavedPlaylist savedPlaylist);

    @Mapping(target = "savedAt", expression = "java(Timestamp.from(Instant.parse(savedPlaylistDto.getSavedAt())))")
    SavedPlaylist toEntity(SavedPlaylistDto savedPlaylistDto);
}
