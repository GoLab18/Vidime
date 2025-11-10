package com.golab18.vidime.controller;

import com.golab18.vidime.dto.ChannelLinkDto;
import com.golab18.vidime.service.ChannelLinkService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ChannelLinkController {

    private final ChannelLinkService channelLinkService;

    @PostMapping("/channel-links/create")
    public ResponseEntity<ChannelLinkDto> createChannelLink(@RequestBody ChannelLinkDto channelLinkDto) {
        ChannelLinkDto createdChannelLink = channelLinkService.createChannelLink(channelLinkDto);
        return new ResponseEntity<>(createdChannelLink, HttpStatus.CREATED);
    }

    @GetMapping("/channel-links/channel/{channelId}")
    public ResponseEntity<List<ChannelLinkDto>> getChannelLinksByChannelId(@PathVariable Long channelId) {
        List<ChannelLinkDto> channelLinks = channelLinkService.getChannelLinksByChannelId(channelId);
        return ResponseEntity.ok(channelLinks);
    }

    @PutMapping("/channel-links/update/{id}")
    public ResponseEntity<ChannelLinkDto> updateChannelLink(@PathVariable Long id, @RequestBody ChannelLinkDto channelLinkDto) {
        ChannelLinkDto updatedChannelLink = channelLinkService.updateChannelLink(id, channelLinkDto);
        return ResponseEntity.ok(updatedChannelLink);
    }

    @DeleteMapping("/channel-links/delete/{id}")
    public ResponseEntity<Void> deleteChannelLink(@PathVariable Long id) {
        channelLinkService.deleteChannelLink(id);
        return ResponseEntity.noContent().build();
    }
}
