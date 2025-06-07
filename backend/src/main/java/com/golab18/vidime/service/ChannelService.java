package com.golab18.vidime.service;

import com.golab18.vidime.dto.ChannelDto;
import java.util.List;
import java.util.UUID;

public interface ChannelService {
    ChannelDto createChannel(ChannelDto channelDto);
    ChannelDto getChannelById(Long id);
    ChannelDto getChannelByUuid(UUID uuid);
    List<ChannelDto> getChannelsByUserId(Long userId);
    ChannelDto updateChannel(Long id, ChannelDto channelDto);
    void deleteChannel(Long id);
}
