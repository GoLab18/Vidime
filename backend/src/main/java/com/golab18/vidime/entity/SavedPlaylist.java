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

    @Column(nullable = false) // TODO add foreing key with ON DELETE CASCADE on the DB side
    private Long saverId; // Has a foreign key to the channel in the db for integrity

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "playlist_id", referencedColumnName = "id")
    private Playlist playlist;

    @Column(nullable = false)
    private Timestamp savedAt = new Timestamp(System.currentTimeMillis());
}
