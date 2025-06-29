package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import lombok.Data;

@Data
@Entity
@Table(name = "videos")
public class Video {
    public Video() {}
    public Video(Long id) { this.id = id; }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 36, nullable = false, unique = true)
    private UUID uuid = UUID.randomUUID();

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
    private Float ratingsSum = 0f;

    @Column(nullable = false)
    private Float avgRating = 0f;

    @Column(nullable = false)
    private Float bayesianRating = 0f;

    @Column(nullable = false)
    private Float bayesianRatingWithTimeDecay = 0f;

    @Column(nullable = false)
    private Float decayedViews = 0f;

    @Column(nullable = false)
    private Timestamp addedAt = new Timestamp(System.currentTimeMillis());

    @OneToMany(mappedBy = "video", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<VideoTag> tags;

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

    // Calculates Bayesian rating (all time) based on:
    // m -> global average rating of all videos,
    // C -> confidence level
    public void calculateBayesianRating(float m, float C) {
        float v = this.ratingsAmount;
        this.bayesianRating = (v / (v + C)) * this.avgRating + (C / (v + C)) * m;
    }

    // Calculates Bayesian rating (last week) based on:
    // decayedAvgRating -> average rating of videos decayed,
    // decayedRatingCount -> number of ratings decayed,
    // m -> global average rating of all videos,
    // C -> confidence level
    public void calculateTimeDecayedBayesianRating(float decayedAvgRating, float decayedRatingCount, float m, float C) {
        this.bayesianRatingWithTimeDecay = (decayedRatingCount / (decayedRatingCount + C)) * decayedAvgRating
            + (C / (decayedRatingCount + C)) * m;
    }
}
