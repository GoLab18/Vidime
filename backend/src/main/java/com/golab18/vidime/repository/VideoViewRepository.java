package com.golab18.vidime.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.golab18.vidime.entity.VideoView;

@Repository
public interface VideoViewRepository extends JpaRepository<VideoView, Long> {

    @Modifying
    @Query("UPDATE Video SET views = views + 1 WHERE id = :videoId")
    void incrementViews(@Param("videoId") Long videoId);

    @Query("SELECT video.id, viewedAt FROM VideoView WHERE video.id IN :videoIds")
    List<Object[]> findViewsByVideoIds(@Param("videoIds") List<Long> videoIds);

    @Query(value = """
    WITH RECURSIVE date_range AS (
        SELECT :start AS dt
        UNION ALL
        SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM date_range WHERE dt < :end
    )
    SELECT
        dr.dt AS date,
        COALESCE(COUNT(vv.id), 0) AS viewCount
    FROM date_range dr
    LEFT JOIN video_views vv
        ON DATE(vv.viewed_at) = dr.dt
        AND vv.video_id IN (
        SELECT id FROM videos WHERE channel_id = :channelId
        )
    GROUP BY dr.dt
    ORDER BY dr.dt
    """, nativeQuery = true)
    List<Object[]> countViewsByChannelPerDay(
        @Param("channelId") Long channelId,
        @Param("start") Date start,
        @Param("end") Date end
    );    
}
