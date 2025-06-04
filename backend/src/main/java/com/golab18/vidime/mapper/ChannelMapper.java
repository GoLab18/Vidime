package com.golab18.vidime.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

import com.golab18.vidime.dto.ChannelDto;
import com.golab18.vidime.dto.ChannelSlimDto;
import com.golab18.vidime.entity.Channel;

@Mapper(componentModel = "spring", uses = {UserMapper.class}, imports = {Timestamp.class, Instant.class, UUID.class})
public interface ChannelMapper {
    @Mapping(target = "uuid", expression = "java(channel.getUuid().toString())")
    @Mapping(target = "createdAt", expression = "java(channel.getCreatedAt() != null ? channel.getCreatedAt().toString() : null)")
    ChannelDto toDto(Channel channel);
    
    @Mapping(target = "uuid", expression = "java(channelDto.getUuid() != null ? UUID.fromString(channelDto.getUuid()) : null)")
    @Mapping(target = "createdAt", expression = "java(channelDto.getCreatedAt() != null ? Timestamp.from(Instant.parse(channelDto.getCreatedAt())) : null)")
    @Mapping(target = "savedPlaylistEntries", ignore = true)
    @Mapping(target = "subscribers", ignore = true)
    @Mapping(target = "subscriptionsMade", ignore = true)
    @Mapping(target = "watchHistoryEntries", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "replies", ignore = true)
    @Mapping(target = "ratings", ignore = true)
    @Mapping(target = "playlists", ignore = true)
    Channel toEntity(ChannelDto channelDto);

    ChannelSlimDto toSlimDto(Channel channel);
}
