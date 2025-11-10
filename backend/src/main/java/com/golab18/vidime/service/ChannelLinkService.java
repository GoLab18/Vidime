package com.golab18.vidime.service;

import com.golab18.vidime.dto.ChannelLinkDto;
import java.util.List;

public interface ChannelLinkService {
    ChannelLinkDto createChannelLink(ChannelLinkDto channelLinkDto);
    List<ChannelLinkDto> getChannelLinksByChannelId(Long channelId);
    ChannelLinkDto updateChannelLink(Long id, ChannelLinkDto channelLinkDto);
    void deleteChannelLink(Long id);
}
