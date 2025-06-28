package com.golab18.vidime.service;

import java.util.Optional;

import com.golab18.vidime.dto.SubscriptionDto;
import com.golab18.vidime.dto.SubscriptionPartiesDto;

public interface SubscriptionService {
    Optional<SubscriptionDto> getSubscription(Long subscriberId, Long channelId);
    SubscriptionDto subscribe(SubscriptionPartiesDto subscriptionDto);
    void unsubscribe(Long subscriptionId);
}
