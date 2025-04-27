package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

import lombok.Data;

@Data
@Entity
@Table(name = "videos")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 36, nullable = false, unique = true)
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(name = "cdn_url", nullable = false)
    private String cdnUrl;

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(nullable = false)
    private Integer duration;

    @Column
    private Integer views = 0;

    @Column
    private Integer ratings = 0;

    @Column(name = "avg_rating")
    private Float avgRating = 0f;

    @Column(name = "added_at")
    private Timestamp addedAt;
}
