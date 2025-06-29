package com.golab18.vidime.service;

import java.util.List;
import java.util.Optional;

import com.golab18.vidime.dto.DailyAggregation;
import com.golab18.vidime.dto.SubscriptionDto;
import com.golab18.vidime.dto.SubscriptionPartiesDto;

public interface SubscriptionService {
    Optional<SubscriptionDto> getSubscription(Long subscriberId, Long channelId);
    List<DailyAggregation> countSubscriptionsByChannelPerDay(Long channelId, String start, String end);
    SubscriptionDto subscribe(SubscriptionPartiesDto subscriptionDto);
    void unsubscribe(Long subscriptionId);
}
