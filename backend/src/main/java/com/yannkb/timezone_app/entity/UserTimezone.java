package com.yannkb.timezone_app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class UserTimezone {
    @Id
    @GeneratedValue
    private Long id;
    private String label; // User-friendly label (e.g., "Paris Office")
    private String zoneId; // The actual timezone ID (e.g., "Europe/Paris")
    private String utcOffset; // Current utcOffset (e.g., "+01:00")
    private String region; // Region/Country info

    public UserTimezone(String label, String zoneId, String utcOffset, String region) {
        this.label = label;
        this.zoneId = zoneId;
        this.utcOffset = utcOffset;
        this.region = region;
    }

    public UserTimezone() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getZoneId() {
        return zoneId;
    }

    public void setZoneId(String zoneId) {
        this.zoneId = zoneId;
    }

    public String getUtcOffset() {
        return utcOffset;
    }

    public void setUtcOffset(String utcOffset) {
        this.utcOffset = utcOffset;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
