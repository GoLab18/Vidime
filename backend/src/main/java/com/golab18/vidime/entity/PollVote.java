package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "poll_votes", uniqueConstraints = {@UniqueConstraint(columnNames = {"voter_id", "poll_id"})})
public class PollVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "poll_id", referencedColumnName = "id")
    private Poll poll;

    @ManyToOne
    @JoinColumn(name = "voter_id", referencedColumnName = "id")
    private Channel voter;

    @ManyToOne
    @JoinColumn(name = "option_id", referencedColumnName = "id")
    private PollOption option;

    @Column(nullable = false)
    private Timestamp votedAt = new Timestamp(System.currentTimeMillis());
}
