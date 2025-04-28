package com.golab18.vidime.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.Data;

@Data
@Entity
@Table(name = "subscriptions")
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "subscriber_id", referencedColumnName = "id")
    private User subscriber;

    @ManyToOne
    @JoinColumn(name = "channel_id", referencedColumnName = "id")
    private Channel channel;

    @Column(name = "subscribed_at")
    private Timestamp subscribedAt;
}
