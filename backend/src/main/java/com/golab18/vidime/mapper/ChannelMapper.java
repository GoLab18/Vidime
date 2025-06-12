package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

import com.golab18.vidime.dto.ChannelCreateDto;
import com.golab18.vidime.dto.ChannelDto;
import com.golab18.vidime.dto.ChannelSlimDto;
import com.golab18.vidime.entity.Channel;

@Mapper(componentModel = "spring", imports = {Timestamp.class, Instant.class, UUID.class})
public interface ChannelMapper {
    @Mapping(target = "uuid", expression = "java(channel.getUuid().toString())")
    @Mapping(target = "userId", source = "user.id")
    @Mapping(target = "createdAt", expression = "java(channel.getCreatedAt() != null ? channel.getCreatedAt().toString() : null)")
    ChannelDto toDto(Channel channel);

    @Mapping(target = "userId", source = "user.id")
    ChannelSlimDto toSlimDto(Channel channel);
    
    @Mapping(target = "uuid", expression = "java(channelDto.getUuid() != null ? UUID.fromString(channelDto.getUuid()) : null)")
    @Mapping(target = "createdAt", expression = "java(channelDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(channelDto.getCreatedAt())) : null)")
    @Mapping(target = "user", expression = "java(channelDto.getUserId() != null ? new User(channelDto.getUserId()) : null)")
    @Mapping(target = "savedPlaylistEntries", ignore = true)
    @Mapping(target = "subscribers", ignore = true)
    @Mapping(target = "subscriptionsMade", ignore = true)
    @Mapping(target = "watchHistoryEntries", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "replies", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "playlists", ignore = true)
    Channel toEntity(ChannelDto channelDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "uuid", expression = "java(UUID.randomUUID())")
    @Mapping(target = "user", expression = "java(channelCreateDto.getUserId() != null ? new User(channelCreateDto.getUserId()) : null)")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "subscribersCount", ignore = true)
    @Mapping(target = "videosAmount", ignore = true)
    @Mapping(target = "savedPlaylistEntries", ignore = true)
    @Mapping(target = "subscribers", ignore = true)
    @Mapping(target = "subscriptionsMade", ignore = true)
    @Mapping(target = "watchHistoryEntries", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "replies", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "playlists", ignore = true)
    @Mapping(target = "verified", ignore = true)
    Channel createToEntity(ChannelCreateDto channelCreateDto);
}
