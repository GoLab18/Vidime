package com.golab18.vidime.controller;

import com.golab18.vidime.dto.ChannelCreateDto;
import com.golab18.vidime.dto.ChannelDto;
import com.golab18.vidime.dto.ChannelSlimDto;
import com.golab18.vidime.service.ChannelService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/channels")
@RequiredArgsConstructor
public class ChannelController {

    private final ChannelService channelService;

    @GetMapping("/id/{id}")
    public ResponseEntity<ChannelDto> getChannelById(@PathVariable Long id) {
        ChannelDto channelDto = channelService.getChannelById(id);
        return ResponseEntity.ok(channelDto);
    }

    @GetMapping("/uuid/{uuid}")
    public ResponseEntity<ChannelDto> getChannelByUuid(@PathVariable UUID uuid) {
        ChannelDto channelDto = channelService.getChannelByUuid(uuid);
        return ResponseEntity.ok(channelDto);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ChannelSlimDto>> getChannelsByUserId(@PathVariable Long userId) {
        List<ChannelSlimDto> channels = channelService.getChannelsByUserId(userId);
        return ResponseEntity.ok(channels);
    }

    @PostMapping("/create")
    public ResponseEntity<ChannelSlimDto> createChannel(@RequestBody ChannelCreateDto channelCreateDto) {
        ChannelSlimDto createdChannel = channelService.createChannel(channelCreateDto);
        return new ResponseEntity<>(createdChannel, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ChannelDto> updateChannel(@PathVariable Long id, @RequestBody ChannelDto channelDto) {
        ChannelDto updatedChannel = channelService.updateChannel(id, channelDto);
        return ResponseEntity.ok(updatedChannel);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteChannel(@PathVariable Long id) {
        channelService.deleteChannel(id);
        return ResponseEntity.noContent().build();
    }
}
