package com.yannkb.timezone_app.controller;

import com.yannkb.timezone_app.entity.UserTimezone;
import com.yannkb.timezone_app.service.UserTimezoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usertimezones")
public class UserTimezoneController {
    @Autowired
    private UserTimezoneService userTimezoneService;

    @PostMapping
    public UserTimezone createUserTimezone(@RequestBody UserTimezone userTimezone) {
        return userTimezoneService.save(userTimezone);
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
}
