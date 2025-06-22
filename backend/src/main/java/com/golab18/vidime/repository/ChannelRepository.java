package com.golab18.vidime.repository;

import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.User;
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
}
