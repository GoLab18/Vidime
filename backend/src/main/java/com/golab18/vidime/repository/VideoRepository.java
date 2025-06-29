package com.golab18.vidime.repository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.golab18.vidime.dto.AggregatedGlobalRatings;
import com.golab18.vidime.dto.StatsVideo;
import com.golab18.vidime.entity.Channel;
import com.golab18.vidime.entity.Video;
import com.golab18.vidime.entity.VideoView;

import jakarta.transaction.Transactional;

@Repository
public interface VideoRepository extends JpaRepository<Video, Long> {
    Optional<Video> findByUuid(UUID uuid);
    List<Video> findByChannel(Channel channel);
    List<Video> findByChannelId(Long channelId, Sort sort);

    @Query("SELECT new com.golab18.vidime.dto.AggregatedGlobalRatings(SUM(ratingsSum), SUM(ratingsAmount)) FROM Video")
    AggregatedGlobalRatings getAggregatedGlobalRatings();

    @Query("SELECT ratingsAmount FROM Video ORDER BY ratingsAmount ASC")
    List<Integer> getRatingsAmountsSortedAsc();

    @Query("SELECT v.id FROM Video v")
    Page<Long> findVideoIds(Pageable pageable);

    @Query("SELECT DISTINCT v FROM Video v LEFT JOIN FETCH v.ratings WHERE v.id IN :ids")
    List<Video> findAllWithRatingsByIdIn(@Param("ids") List<Long> ids);

    @Modifying
    @Transactional
    @Query("UPDATE Video SET decayedViews = :decayedViews WHERE id = :videoId")
    void updateDecayedViews(@Param("videoId") Long videoId, @Param("decayedViews") float decayedViews);

    @Query("""
    SELECT new com.golab18.vidime.dto.StatsVideo(
        v.id, v.uuid, v.title, v.thumbnailUrl,
        v.duration, v.views, v.addedAt, COUNT(vv.id)
    )
    FROM Video v
    LEFT JOIN VideoView vv ON vv.video.id = v.id AND vv.viewedAt BETWEEN :start AND :end
    WHERE v.channel.id = :channelId
    GROUP BY v.id, v.uuid, v.title, v.thumbnailUrl, v.duration, v.views, v.addedAt
    ORDER BY COUNT(vv.id) DESC
    """)
    List<StatsVideo> getStatsVideos(
        @Param("channelId") Long channelId,
        @Param("start") Date start,
        @Param("end") Date end
    );
}
