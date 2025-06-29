package com.golab18.vidime.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class DailyAggregation {
    private String date;
    private long data;

    public DailyAggregation(Date date, long data) {
        this.date = date.toString();
        this.data = data;
    }
}
