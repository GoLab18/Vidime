package com.golab18.vidime.service;

import com.golab18.vidime.dto.ChannelCreateDto;
import com.golab18.vidime.dto.ChannelDto;
import com.golab18.vidime.dto.ChannelSlimDto;
import com.golab18.vidime.dto.ChannelTrending;

import java.util.List;
import java.util.UUID;

public interface ChannelService {
    ChannelSlimDto createChannel(ChannelCreateDto channelCreateDto);
    ChannelDto getChannelById(Long id);
    ChannelDto getChannelByUuid(UUID uuid);
    List<ChannelSlimDto> getChannelsByUserId(Long userId);
    List<ChannelTrending> getMostSubscribedChannelsAllTime();
    List<ChannelTrending> getMostViewedChannelsAllTime();
    List<ChannelTrending> getMostViewedChannelsLastWeek();
    ChannelDto updateChannel(Long id, ChannelDto channelDto);
    void deleteChannel(Long id);
}
