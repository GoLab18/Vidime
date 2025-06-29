package com.golab18.vidime.repository;

import com.golab18.vidime.dto.ChannelTrending;
import com.golab18.vidime.entity.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findByUuid(UUID uuid);
    List<Channel> findByUserId(Long userId);
    Optional<Channel> findByName(String name);
    
    @Modifying
    @Query("UPDATE Channel c SET c.videosAmount = c.videosAmount + 1 WHERE c.id = :channelId")
    void incrementVideosAmount(@Param("channelId") Long channelId);

    @Modifying
    @Query("UPDATE Channel c SET c.videosAmount = c.videosAmount - 1 WHERE c.id = :channelId")
    void decrementVideosAmount(@Param("channelId") Long channelId);

    @Modifying
    @Query("UPDATE Channel c SET c.subscribersCount = c.subscribersCount + 1 WHERE c.id = :channelId")
    void incrementSubscribersCount(@Param("channelId") Long channelId);

    @Modifying
    @Query("UPDATE Channel c SET c.subscribersCount = c.subscribersCount - 1 WHERE c.id = :channelId")
    void decrementSubscribersCount(@Param("channelId") Long channelId);

    @Query("""
    SELECT new com.golab18.vidime.dto.ChannelTrending(c.id, c.uuid, c.name, c.picture, c.verified, c.subscribersCount, SUM(v.views))
    FROM Channel c 
    JOIN Video v ON v.channel.id = c.id 
    GROUP BY c.id, c.uuid, c.name, c.picture, c.verified, c.subscribersCount 
    ORDER BY 
        CASE WHEN :sortBy = 'viewsAllTime' THEN SUM(v.views) END DESC,
        CASE WHEN :sortBy = 'decayedViews' THEN SUM(v.decayedViews) END DESC,
        CASE WHEN :sortBy = 'subscribersCount' THEN c.subscribersCount END DESC
    """)
    List<ChannelTrending> findChannelsWithStats(@Param("sortBy") String sortBy);
}
