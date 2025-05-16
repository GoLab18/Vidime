package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.golab18.vidime.dto.WatchHistoryDto;
import com.golab18.vidime.entity.WatchHistory;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Instant;

@Mapper(componentModel = "spring", uses = {VideoMapper.class}, imports = {Timestamp.class, Instant.class, Date.class})
public interface WatchHistoryMapper {
    @Mapping(target = "watchedDate", expression = "java(watchHistory.getWatchedDate() != null ? watchHistory.getWatchedDate().toString() : null)")
    @Mapping(target = "lastWatchedAt", expression = "java(watchHistory.getLastWatchedAt() != null ? watchHistory.getLastWatchedAt().toString() : null)")
    WatchHistoryDto toDto(WatchHistory watchHistory);

    // TODO might need adjusting the conversion from string to Date because of timezones
    @Mapping(target = "watchedDate", expression = "java(watchHistoryDto.getWatchedDate() != null ? Date.valueOf(watchHistoryDto.getWatchedDate()) : null)")
    @Mapping(target = "lastWatchedAt", expression = "java(watchHistoryDto.getLastWatchedAt() != null ? Timestamp.from(Instant.parse(watchHistoryDto.getLastWatchedAt())) : null)")
    WatchHistory toEntity(WatchHistoryDto watchHistoryDto);
}
