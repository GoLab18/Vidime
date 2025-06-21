package com.golab18.vidime.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.golab18.vidime.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> getTagByName(String name);
}
