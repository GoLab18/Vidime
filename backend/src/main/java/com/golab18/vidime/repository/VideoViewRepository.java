package com.golab18.vidime.repository;

import java.sql.Timestamp;
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
}
