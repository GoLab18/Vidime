package com.golab18.vidime.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "ratings", uniqueConstraints = {@UniqueConstraint(columnNames = {"rater_id", "video_id"})})
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "rater_id", referencedColumnName = "id")
    private Channel rater;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;

    @Column(precision = 3, scale = 2, nullable = false)
    private BigDecimal score;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
}
