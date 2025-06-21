package com.golab18.vidime.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.Video;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findByUuid(UUID uuid);
    List<Video> findByChannel(Channel channel);
    List<Video> findByChannelId(Long channelId);
}
