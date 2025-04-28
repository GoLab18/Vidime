package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "id") // TODO May be better to be just a video id annotated with @Column
    private Video video;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
