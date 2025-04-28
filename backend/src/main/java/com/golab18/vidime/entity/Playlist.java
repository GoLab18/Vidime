package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "playlists")
public class Playlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @Column(nullable = false)
    private String title;

    @Column
    private String description;

    @Column(name = "is_public")
    private Boolean isPublic = true;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
