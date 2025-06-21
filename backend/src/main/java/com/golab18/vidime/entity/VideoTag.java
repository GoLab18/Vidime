package com.golab18.vidime.entity;

import java.util.Objects;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "videos_tags")
public class VideoTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "video_id", referencedColumnName = "id", nullable = false)
    private Video video;

    @ManyToOne
    @JoinColumn(name = "tag_id", referencedColumnName = "id", nullable = false)
    private Tag tag;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        VideoTag videoTag = (VideoTag) o;
        return Objects.equals(video != null ? video.getId() : null, videoTag.video != null ? videoTag.video.getId() : null)
            && Objects.equals(tag != null ? tag.getId() : null, videoTag.tag != null ? videoTag.tag.getId() : null);
    }

    @Override
    public int hashCode() {
        return Objects.hash(video != null ? video.getId() : null, tag != null ? tag.getId() : null);
    }
}
