package com.golab18.vidime.repository;

import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.ChannelLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelLinkRepository extends JpaRepository<ChannelLink, Long> {
    List<ChannelLink> findByChannel(Channel channel);
    List<ChannelLink> findByChannelId(Long channelId);
    Optional<ChannelLink> findByChannelIdAndPosition(Long channelId, Integer position);
    void deleteByChannelId(Long channelId); // For bulk deletion if a channel is deleted
}
