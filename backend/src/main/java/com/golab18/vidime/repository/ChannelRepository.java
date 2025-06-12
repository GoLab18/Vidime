package com.golab18.vidime.repository;

import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findByUuid(UUID uuid);
    List<Channel> findByUserId(Long userId);
    Optional<Channel> findByName(String name);
}
