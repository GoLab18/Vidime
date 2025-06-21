package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;
import java.util.List;

@Data
@Entity
@Table(name = "channels")
public class Channel {
    public Channel() {}
    public Channel(Long id) { this.id = id; }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 36, nullable = false, unique = true)
    private UUID uuid = UUID.randomUUID();

    @Column(nullable = false)
    private String name;

    @Column
    private String picture;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer videosAmount = 0;

    @Column(nullable = false)
    private Integer subscribersCount = 0;

    @Column(nullable = false)
    private Boolean verified = false;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @OneToMany(mappedBy = "saver", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SavedPlaylist> savedPlaylistEntries;

    @OneToMany(mappedBy = "subscriber", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Subscription> subscriptionsMade;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Subscription> subscribers;

    @OneToMany(mappedBy = "viewer", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<WatchHistory> watchHistoryEntries;

    @OneToMany(mappedBy = "commenter", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "replier", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Reply> replies;

    @OneToMany(mappedBy = "rater", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Rating> ratings;

    @OneToMany(mappedBy = "channel", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Playlist> playlists;
}
