package com.golab18.vidime.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.golab18.vidime.entity.Subscription;

public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findBySubscriberIdAndChannelId(Long subscriberId, Long channelId);
    void deleteBySubscriberIdAndChannelId(Long subscriberId, Long channelId);

    @Query("SELECT s.channel.id FROM Subscription s WHERE s.id = :subscriptionId")
    Optional<Long> fetchChannelSubscribedToId(Long subscriptionId);

    @Query(value = """
    WITH RECURSIVE date_range AS (
        SELECT :start AS dt
        UNION ALL
        SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM date_range WHERE dt < :end
    )
    SELECT
        dr.dt AS date,
        COUNT(s.id) AS subscriptionCount
    FROM date_range dr
    LEFT JOIN subscriptions s
        ON DATE(s.subscribed_at) = dr.dt
        AND s.channel_id = :channelId
    GROUP BY dr.dt
    ORDER BY dr.dt
    """, nativeQuery = true)
    List<Object[]> countSubscriptionsByChannelPerDay(
        @Param("channelId") Long channelId,
        @Param("start") Date start,
        @Param("end") Date end
    );
}
