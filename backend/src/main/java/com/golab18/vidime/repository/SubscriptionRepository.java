package com.golab18.vidime.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.golab18.vidime.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findBySubscriberIdAndChannelId(Long subscriberId, Long channelId);
    void deleteBySubscriberIdAndChannelId(Long subscriberId, Long channelId);

    @Query("SELECT s.channel.id FROM Subscription s WHERE s.id = :subscriptionId")
    Optional<Long> fetchChannelSubscribedToId(Long subscriptionId);
}
