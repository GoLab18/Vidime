package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;
import java.util.List;
import com.golab18.vidime.entity.PlaylistVideo;
import com.golab18.vidime.entity.SavedPlaylist;

import lombok.Data;

@Data
@Entity
@Table(name = "playlists")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 36, nullable = false, unique = true)
    private UUID uuid = UUID.randomUUID();

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private String thumbnailUrl;

    @Column(nullable = false)
    private Boolean isPublic = true;

    @Column(nullable = false)
    private Integer videoCount = 0;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PlaylistVideo> videoEntries;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<SavedPlaylist> savedByEntries;
}
