package com.golab18.vidime.repository;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.golab18.vidime.entity.WatchHistory;

@Repository
public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {

    // DIALECT-SPECIFIC: MySQL -> uses ON DUPLICATE KEY UPDATE
    @Modifying
    @Query(value = """
        INSERT INTO watch_history (viewer_id, video_id, watched_date, last_watched_at)
        VALUES (:viewerId, :videoId, :watchedDate, :lastWatchedAt)
        ON DUPLICATE KEY UPDATE
        last_watched_at = :lastWatchedAt
    """, nativeQuery = true)
    void upsertWatchHistory(
        @Param("viewerId") Long viewerId,
        @Param("videoId") Long videoId,
        @Param("watchedDate") Date watchedDate,
        @Param("lastWatchedAt") Timestamp lastWatchedAt
    );
}
