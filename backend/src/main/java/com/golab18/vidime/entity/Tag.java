package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;
}
