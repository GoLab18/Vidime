package com.golab18.vidime.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.golab18.vidime.dto.SubscriptionDto;
import com.golab18.vidime.dto.SubscriptionPartiesDto;
import com.golab18.vidime.service.SubscriptionService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    
    private final SubscriptionService subscriptionService;

    @GetMapping("/check")
    public ResponseEntity<SubscriptionDto> getSubscription(@RequestParam Long subscriberId, @RequestParam Long channelId) {
        Optional<SubscriptionDto> sub = subscriptionService.getSubscription(subscriberId, channelId);
        return sub
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/sub")
    public ResponseEntity<SubscriptionDto> subscribe(@RequestBody SubscriptionPartiesDto subscriptionDto) {
        SubscriptionDto sub = subscriptionService.subscribe(subscriptionDto);
        return ResponseEntity.ok(sub);
    }

    @DeleteMapping("/unsub/{subscriptionId}")
    public ResponseEntity<Void> unsubscribe(@PathVariable Long subscriptionId) {
        subscriptionService.unsubscribe(subscriptionId);
        return ResponseEntity.noContent().build();
    }
}
