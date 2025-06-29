package com.golab18.vidime.repository;

import java.sql.Date;
import java.sql.Timestamp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.golab18.vidime.dto.HistoryVideo;
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

    @Query(value = """
        SELECT new com.golab18.vidime.dto.HistoryVideo(
            v.id, v.uuid, new com.golab18.vidime.dto.ChannelSlimDto(c.id, c.uuid, c.name, c.picture, c.user.id, c.verified),
            v.title, v.description, v.thumbnailUrl, v.duration, v.views, v.addedAt, wh.lastWatchedAt
        )
        FROM WatchHistory wh
        JOIN wh.video v JOIN v.channel c
        WHERE wh.viewer.id = :viewerId
        AND (:before IS NULL OR wh.lastWatchedAt < :before)
        ORDER BY wh.lastWatchedAt DESC
        """,
        countQuery = """
        SELECT COUNT(wh)
        FROM WatchHistory wh
        JOIN wh.video v JOIN v.channel c
        WHERE wh.viewer.id = :viewerId
        AND (:before IS NULL OR wh.lastWatchedAt < :before)
        """
    )
    Page<HistoryVideo> fetchWatchHistoryData(
        @Param("viewerId") Long viewerId,
        @Param("before") Timestamp before,
        Pageable pageable
    );
}
