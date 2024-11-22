package com.yannkb.timezone_app.service;

import com.yannkb.timezone_app.entity.UserTimezone;
import com.yannkb.timezone_app.repository.UserTimezoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@Service
public class UserTimezoneService {

    @Autowired
    private UserTimezoneRepository userTimezoneRepository;

    public List<String> getAllAvailableTimezones() {
        return new ArrayList<>(ZoneId.getAvailableZoneIds());
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
        userTimezone.setId(id);
        userTimezoneRepository.save(userTimezone);
    }

    public void deleteUserTimezone(Long id) {
        userTimezoneRepository.deleteById(id);
    }
}
