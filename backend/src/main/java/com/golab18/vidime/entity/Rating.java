package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "ratings", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "video_id"})})
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;

    @Column(nullable = false)
    private Integer level;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
