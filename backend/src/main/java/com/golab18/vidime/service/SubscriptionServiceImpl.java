package com.golab18.vidime.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.golab18.vidime.dto.DailyAggregation;
import com.golab18.vidime.dto.SubscriptionDto;
import com.golab18.vidime.dto.SubscriptionPartiesDto;
import com.golab18.vidime.entity.Subscription;
import com.golab18.vidime.exception.ResourceNotFoundException;
import com.golab18.vidime.mapper.SubscriptionMapper;
import com.golab18.vidime.repository.ChannelRepository;
import com.golab18.vidime.repository.SubscriptionRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;
    private final ChannelRepository channelRepository;
    private final SubscriptionMapper subscriptionMapper;
    
    @Override
    public Optional<SubscriptionDto> getSubscription(Long subscriberId, Long channelId) {
        return subscriptionRepository.findBySubscriberIdAndChannelId(subscriberId, channelId)
            .map(subscriptionMapper::toDto);
    }

    @Override
    @Transactional
    public List<DailyAggregation> countSubscriptionsByChannelPerDay(Long channelId, String start, String end) {
        Date startDate = Date.valueOf(start);
        Date endDate = Date.valueOf(end);
        List<Object[]> buckets = subscriptionRepository.countSubscriptionsByChannelPerDay(channelId, startDate, endDate);

        return buckets.stream()
            .map(row -> new DailyAggregation(
                Date.valueOf(row[0].toString()),
                ((Long) row[1])
            ))
            .collect(Collectors.toList());
    }
    
    @Override
    @Transactional
    public SubscriptionDto subscribe(SubscriptionPartiesDto subscriptionPartiesDto) {
        Subscription subscription = subscriptionMapper.partiesToEntity(subscriptionPartiesDto);
        subscriptionRepository.save(subscription);
        channelRepository.incrementSubscribersCount(subscriptionPartiesDto.getChannelId());
        return subscriptionMapper.toDto(subscription);
    }

    @Override
    @Transactional
    public void unsubscribe(Long subscriptionId) {
        Long channelId = subscriptionRepository.fetchChannelSubscribedToId(subscriptionId)
            .orElseThrow(() -> new ResourceNotFoundException("Subscription", "id", subscriptionId));
        
        subscriptionRepository.deleteById(subscriptionId);
        channelRepository.decrementSubscribersCount(channelId);
    }
}
