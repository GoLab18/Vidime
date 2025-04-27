package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "channels")
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String picture;

    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column(name = "videos_amount", nullable = false)
    private Integer videosAmount = 0;

    @Column(name = "subscribers_count", nullable = false)
    private Integer subscribersCount = 0;
}
