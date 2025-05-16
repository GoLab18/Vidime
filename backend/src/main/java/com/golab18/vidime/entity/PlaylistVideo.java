package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "playlists_videos")
public class PlaylistVideo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "playlist_id", referencedColumnName = "id")
    private Playlist playlist;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;

    @Column(nullable = false)
    private Integer position;
}
