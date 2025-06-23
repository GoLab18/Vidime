package com.golab18.vidime.dto;

import lombok.Data;

@Data
public class AggregatedGlobalRatings {
    private Double totalRatingsSum;
    private Long totalRatingsCount;

    public AggregatedGlobalRatings(Double totalRatingsSum, Long totalRatingsCount) {
        this.totalRatingsSum = totalRatingsSum;
        this.totalRatingsCount = totalRatingsCount;
    }
}
