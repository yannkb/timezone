package com.yannkb.timezone_app.service;

import com.yannkb.timezone_app.entity.UserTimezone;
import com.yannkb.timezone_app.repository.UserTimezoneRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserTimezoneService {

    @Autowired
    private UserTimezoneRepository userTimezoneRepository;

    public UserTimezone save(UserTimezone userTimezone) {
        return userTimezoneRepository.save(userTimezone);
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
