package com.yannkb.timezone_app.service;

import com.yannkb.timezone_app.entity.UserTimezone;
import com.yannkb.timezone_app.repository.UserTimezoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserTimezoneService {

    @Autowired
    private UserTimezoneRepository userTimezoneRepository;

    public List<Map<String, String>> getAllAvailableTimezones() {
        return ZoneId.getAvailableZoneIds().stream()
            .map(zoneId -> {
                Map<String, String> details = getTimezoneDetails(zoneId);
                String label = zoneId.contains("/") 
                    ? zoneId.split("/")[1].replace("_", " ") 
                    : zoneId;
                
                Map<String, String> timezone = new HashMap<>();
                timezone.put("label", label);
                timezone.put("zoneId", zoneId);
                timezone.put("utcOffset", details.get("utcOffset"));
                timezone.put("region", details.get("region"));
                
                return timezone;
            })
            .sorted(Comparator.comparing((Map<String, String> tz) -> tz.get("utcOffset"))
                        .thenComparing(tz -> tz.get("region"))
                        .thenComparing(tz -> tz.get("label")))
            .collect(Collectors.toList());
    }

    public Map<String, String> getTimezoneDetails(String zoneId) {
        ZoneId zone = ZoneId.of(zoneId);
        ZonedDateTime now = ZonedDateTime.now(zone);

        Map<String, String> details = new HashMap<>();
        details.put("id", zone.getId());
        details.put("utcOffset", now.getOffset().getId().replace("Z", "+00:00"));
        details.put("region", zone.getId().split("/")[0]);

        return details;
    }

    public UserTimezone save(String label, String zoneId) {
        Map<String, String> details = getTimezoneDetails(zoneId);

        return userTimezoneRepository.save(new UserTimezone(
                label,
                zoneId,
                details.get("utcOffset"),
                details.get("region")
        ));
    }

    public ZonedDateTime convertTime(String sourceZoneId, LocalDateTime dateTime, String targetZoneId) {
        return dateTime.atZone(ZoneId.of(sourceZoneId))
                .withZoneSameInstant(ZoneId.of(targetZoneId));
    }

    public Optional<UserTimezone> findById(Long id) {
        return userTimezoneRepository.findById(id);
    }

    public Iterable<UserTimezone> findAll() {
        return userTimezoneRepository.findAll();
    }

    public void updateUserTimezone(Long id, UserTimezone userTimezone) {
        Map<String, String> details = getTimezoneDetails(userTimezone.getZoneId());
        
        userTimezone.setId(id);
        userTimezone.setUtcOffset(details.get("utcOffset"));
        userTimezone.setRegion(details.get("region"));
        
        userTimezoneRepository.save(userTimezone);
    }

    public void deleteUserTimezone(Long id) {
        userTimezoneRepository.deleteById(id);
    }
}
