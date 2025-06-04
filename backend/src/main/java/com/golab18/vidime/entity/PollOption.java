package com.golab18.vidime.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "poll_options")
public class PollOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "poll_id", referencedColumnName = "id")
    private Poll poll;

    @Column(nullable = false)
    private String optionText;

    @Column(nullable = false)
    private Integer votes = 0;
}
