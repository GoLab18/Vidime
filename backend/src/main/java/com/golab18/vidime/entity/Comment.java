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

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(nullable = false)
    private Integer likes = 0;

    @Column(nullable = false)
    private Integer dislikes = 0;

    @Column(nullable = false)
    private Integer repliesAmount = 0;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
}
