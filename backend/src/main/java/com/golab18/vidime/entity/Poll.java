package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;

import lombok.Data;

@Data
@Entity
@Table(name = "polls")
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "video_id", referencedColumnName = "id")
    private Video video;

    @OneToMany(mappedBy = "poll", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    private List<PollOption> options;

    @Column(nullable = false)
    private String textHeader;

    @Column(nullable = false)
    private Boolean isAnonymous = false;

    @Column(nullable = false)
    private Timestamp createdAt = new Timestamp(System.currentTimeMillis());
}
