package com.yannkb.timezone_app;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserTimezone {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    private String label; // User-friendly label (e.g., "Paris Office")
    private String zoneId; // The actual timezone ID (e.g., "Europe/Paris")
    private String offset; // Current offset (e.g., "+01:00")
    private String region; // Region/Country info

    public UserTimezone(String label, String zoneId, String offset, String region) {
        this.label = label;
        this.zoneId = zoneId;
        this.offset = offset;
        this.region = region;
    }
}
