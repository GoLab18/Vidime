package com.golab18.vidime.entity;

import java.sql.Date;
import java.sql.Timestamp;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "watch_history", uniqueConstraints = {@UniqueConstraint(columnNames = {"channel_id", "video_id", "watched_date"})})
public class WatchHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id", nullable = false)
    private Channel channel;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;

    @Column(nullable = false)
    private Date watchedDate = new Date(System.currentTimeMillis());

    @Column(nullable = false)
    private Timestamp lastWatchedAt = new Timestamp(System.currentTimeMillis());
}
