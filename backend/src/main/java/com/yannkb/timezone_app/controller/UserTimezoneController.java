package com.yannkb.timezone_app.controller;

import com.yannkb.timezone_app.entity.TimeConversionRequest;
import com.yannkb.timezone_app.entity.TimezoneRequest;
import com.yannkb.timezone_app.entity.UserTimezone;
import com.yannkb.timezone_app.service.UserTimezoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usertimezones")
public class UserTimezoneController {
    @Autowired
    private UserTimezoneService userTimezoneService;

    @GetMapping("/available")
    public List<String> getAvailableTimezones() {
        return userTimezoneService.getAllAvailableTimezones();
    }

    @PostMapping
    public UserTimezone createUserTimezone(@RequestBody TimezoneRequest request) {
        return userTimezoneService.save(request.getLabel(), request.getZoneId());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserTimezone> getUserTimezone(@PathVariable Long id) {
        return userTimezoneService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public Iterable<UserTimezone> getAllUserTimezones() {
        return userTimezoneService.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUserTimezone(@PathVariable Long id, @RequestBody UserTimezone userTimezone) {
        userTimezoneService.updateUserTimezone(id, userTimezone);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserTimezone(@PathVariable Long id) {
        userTimezoneService.deleteUserTimezone(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/convert")
    public Map<String, String> convertTime(@RequestBody TimeConversionRequest request) {
        ZonedDateTime converted = userTimezoneService.convertTime(
                request.getSourceZoneId(),
                request.getDateTime(),
                request.getTargetZoneId()
        );

        return Map.of(
                "convertedTime", converted.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                "offset", converted.getOffset().getId()
        );
    }
}
