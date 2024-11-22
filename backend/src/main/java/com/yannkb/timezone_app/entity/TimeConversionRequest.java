package com.yannkb.timezone_app.entity;

import java.time.LocalDateTime;

public class TimeConversionRequest {
    private String sourceZoneId;
    private String targetZoneId;
    private LocalDateTime dateTime;

    public String getSourceZoneId() {
        return sourceZoneId;
    }

    public void setSourceZoneId(String sourceZoneId) {
        this.sourceZoneId = sourceZoneId;
    }

    public String getTargetZoneId() {
        return targetZoneId;
    }

    public void setTargetZoneId(String targetZoneId) {
        this.targetZoneId = targetZoneId;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
