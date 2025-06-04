package com.golab18.vidime.entity;

import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "saved_playlists", uniqueConstraints = {@UniqueConstraint(columnNames = {"saver_id", "playlist_id"})})
public class SavedPlaylist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "saver_id", referencedColumnName = "id", nullable = false)
    private Channel saver;

    @ManyToOne
    @JoinColumn(name = "playlist_id", referencedColumnName = "id")
    private Playlist playlist;

    @Column(nullable = false)
    private Timestamp savedAt = new Timestamp(System.currentTimeMillis());
}
