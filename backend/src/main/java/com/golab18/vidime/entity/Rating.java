package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "ratings", uniqueConstraints = {@UniqueConstraint(columnNames = {"channel_id", "video_id"})})
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;

    @Column(nullable = false)
    private Integer level;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
}
