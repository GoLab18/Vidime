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
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column
    private Integer likes = 0;

    @Column
    private Integer dislikes = 0;

    @Column
    private Integer repliesAmount = 0;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
