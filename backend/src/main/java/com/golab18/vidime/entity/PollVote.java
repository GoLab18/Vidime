package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "poll_votes", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "poll_id"})})
public class PollVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "poll_id", referencedColumnName = "id")
    private Poll poll;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "option_id", referencedColumnName = "id")
    private PollOption option;

    @Column(name = "voted_at")
    private Timestamp votedAt;
}
