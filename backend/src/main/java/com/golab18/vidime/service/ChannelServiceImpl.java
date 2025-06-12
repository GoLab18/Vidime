package com.golab18.vidime.service;

import com.golab18.vidime.dto.ChannelCreateDto;
import com.golab18.vidime.dto.ChannelDto;
import com.golab18.vidime.dto.ChannelSlimDto;
import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.User;
import com.golab18.vidime.repository.ChannelRepository;
import com.golab18.vidime.repository.UserRepository;
import com.golab18.vidime.mapper.ChannelMapper;
import com.golab18.vidime.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelMapper channelMapper;
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    @Override
    public ChannelSlimDto createChannel(ChannelCreateDto channelCreateDto) {
        if (!userRepository.existsById(channelCreateDto.getUserId())) throw new ResourceNotFoundException("User", "id", channelCreateDto.getUserId());

        Channel channel = channelMapper.createToEntity(channelCreateDto);

        channel.setUser(new User(channelCreateDto.getUserId()));
        
        Channel savedChannel = channelRepository.save(channel);
        return channelMapper.toSlimDto(savedChannel);
    }

    @Override
    public ChannelDto getChannelById(Long id) {
        Channel channel = channelRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Channel", "id", id));
        return channelMapper.toDto(channel);
    }

    @Override
    public ChannelDto getChannelByUuid(UUID uuid) {
        Channel channel = channelRepository.findByUuid(uuid)
            .orElseThrow(() -> new ResourceNotFoundException("Channel", "uuid", uuid));
        return channelMapper.toDto(channel);
    }

    @Override
    public List<ChannelSlimDto> getChannelsByUserId(Long userId) {
        return channelRepository.findByUserId(userId).stream()
            .map(channelMapper::toSlimDto)
            .collect(Collectors.toList());
    }

    @Override
    public ChannelDto updateChannel(Long id, ChannelDto channelDto) {
        if (!channelRepository.existsById(id)) throw new ResourceNotFoundException("Channel", "id", id);

        Channel existingChannel = channelRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Channel", "id", id));

        existingChannel.setName(channelDto.getName());
        existingChannel.setPicture(channelDto.getPicture());
        existingChannel.setDescription(channelDto.getDescription());
        existingChannel.setVerified(channelDto.getVerified());

        Channel updatedChannel = channelRepository.save(existingChannel);
        return channelMapper.toDto(updatedChannel);
    }

    @Override
    public void deleteChannel(Long id) {
        Channel channel = channelRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Channel", "id", id));
        channelRepository.delete(channel);
    }
}
