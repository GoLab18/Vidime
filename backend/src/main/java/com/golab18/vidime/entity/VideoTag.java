package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "video_tags")
public class VideoTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "video_id", referencedColumnName = "id", nullable = false)
    private Video video;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "tag_id", referencedColumnName = "id", nullable = false)
    private Tag tag;
}
