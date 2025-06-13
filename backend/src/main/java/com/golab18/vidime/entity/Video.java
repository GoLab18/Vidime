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

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id", nullable = false)
    private Channel channel;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String cdnUrl;

    @Column
    private String thumbnailUrl;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private Integer views = 0;

    @Column(nullable = false)
    private Integer ratingsAmount = 0;

    @Column(nullable = false)
    private Float avgRating = 0f;

    @Column(nullable = false)
    private Timestamp addedAt = new Timestamp(System.currentTimeMillis());

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<VideoTag> tags;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PlaylistVideo> playlistEntries;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Poll> polls;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<WatchHistory> watchHistories;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Rating> ratings;

    @OneToMany(mappedBy = "video", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<VideoView> videoViews;
}
