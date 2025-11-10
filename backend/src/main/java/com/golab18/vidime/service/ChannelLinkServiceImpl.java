package com.golab18.vidime.service;

import com.golab18.vidime.dto.ChannelLinkDto;
import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.ChannelLink;
import com.golab18.vidime.repository.ChannelLinkRepository;
import com.golab18.vidime.repository.ChannelRepository;
import com.golab18.vidime.mapper.ChannelLinkMapper;
import com.golab18.vidime.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChannelLinkServiceImpl implements ChannelLinkService {

    private final ChannelLinkRepository channelLinkRepository;
    private final ChannelRepository channelRepository;
    private final ChannelLinkMapper channelLinkMapper;

    @Override
    @Transactional
    public ChannelLinkDto createChannelLink(ChannelLinkDto channelLinkDto) {
        Channel channel = channelRepository
            .findById(channelLinkDto.getChannelId())
            .orElseThrow(() -> new ResourceNotFoundException("Channel", "id", channelLinkDto.getChannelId()));
        
        // Check for position uniqueness within the channel
        channelLinkRepository.findByChannelIdAndPosition(channelLinkDto.getChannelId(), channelLinkDto.getPosition())
            .ifPresent(link -> {
                throw new IllegalArgumentException("Position " + channelLinkDto.getPosition() + " is already taken for this channel.");
            });

        ChannelLink channelLink = channelLinkMapper.toEntity(channelLinkDto);
        channelLink.setChannel(channel);
        
        ChannelLink savedChannelLink = channelLinkRepository.save(channelLink);
        return channelLinkMapper.toDto(savedChannelLink);
    }

    @Override
    public List<ChannelLinkDto> getChannelLinksByChannelId(Long channelId) {
        if (!channelRepository.existsById(channelId)) {
            throw new ResourceNotFoundException("Channel", "id", channelId);
        }
        return channelLinkRepository.findByChannelId(channelId).stream()
            .map(channelLinkMapper::toDto)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ChannelLinkDto updateChannelLink(Long id, ChannelLinkDto channelLinkDto) {
        ChannelLink existingChannelLink = channelLinkRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("ChannelLink", "id", id));

        // If position is being changed, check for uniqueness for the new position within the same channel
        if (channelLinkDto.getPosition() != null && !channelLinkDto.getPosition().equals(existingChannelLink.getPosition())){
            channelLinkRepository.findByChannelIdAndPosition(existingChannelLink.getChannel().getId(), channelLinkDto.getPosition())
                .ifPresent(link -> {
                    if (!link.getId().equals(existingChannelLink.getId())) {
                         throw new IllegalArgumentException("Position " + channelLinkDto.getPosition() + " is already taken for this channel.");
                    }
                });
            existingChannelLink.setPosition(channelLinkDto.getPosition());
        }

        existingChannelLink.setTitle(channelLinkDto.getTitle());
        existingChannelLink.setUrl(channelLinkDto.getUrl());

        ChannelLink updatedChannelLink = channelLinkRepository.save(existingChannelLink);
        return channelLinkMapper.toDto(updatedChannelLink);
    }

    @Override
    @Transactional
    public void deleteChannelLink(Long id) {
        if (!channelLinkRepository.existsById(id)) throw new ResourceNotFoundException("ChannelLink", "id", id);
        channelLinkRepository.deleteById(id);
    }
}
