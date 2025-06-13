package com.golab18.vidime.entity;

import java.sql.Timestamp;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "video_views")
public class VideoView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne // On viewer channel getting deleted, this is set to null with SET NULL appended during foreign key creation
    @JoinColumn(name = "viewer_id", referencedColumnName = "id")
    private Channel viewer;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "id", nullable = false)
    private Video video;

    @Column(nullable = false)
    private Timestamp viewedAt = new Timestamp(System.currentTimeMillis());
}
