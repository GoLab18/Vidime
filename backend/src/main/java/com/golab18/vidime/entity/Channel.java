package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
@Entity
@Table(name = "channels")
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 36, nullable = false, unique = true)
    private UUID uuid;

    @Column(nullable = false)
    private String name;

    @Column
    private String picture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "videos_amount", nullable = false)
    private Integer videosAmount = 0;

    @Column(name = "subscribers_count", nullable = false)
    private Integer subscribersCount = 0;

    @Column(name = "verified")
    private Boolean verified = false;

    @Column(name = "created_at")
    private Timestamp createdAt;
}
