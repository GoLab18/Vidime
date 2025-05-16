package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;
import lombok.Data;

@Data
@Entity
@Table(name = "playlists")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 36, nullable = false, unique = true)
    private UUID uuid;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String thumbnailUrl;

    @Column(nullable = false)
    private Boolean isPublic = true;

    @Column(nullable = false)
    private Integer videoCount = 0;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
}
