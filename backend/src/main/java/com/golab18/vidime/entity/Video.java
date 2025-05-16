package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
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

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "channel_id", referencedColumnName = "id", nullable = false)
    private Channel channel;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<VideoTag> tags;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String cdnUrl;

    @Column(nullable = false)
    private String thumbnailUrl;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private Integer views = 0;

    @Column(nullable = false)
    private Integer ratings = 0;

    @Column(nullable = false)
    private Float avgRating = 0f;

    @Column(nullable = false)
    private Timestamp addedAt = new Timestamp(System.currentTimeMillis());
}
