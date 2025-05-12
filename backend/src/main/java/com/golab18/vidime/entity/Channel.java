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

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(nullable = false)
    private Integer videosAmount = 0;

    @Column(nullable = false)
    private Integer subscribersCount = 0;

    @Column(nullable = false)
    private Boolean verified = false;

    @Column(nullable = false)
    private Timestamp createdAt;
}
