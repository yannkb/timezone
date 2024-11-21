package com.yannkb.timezone_app.repository;

import com.yannkb.timezone_app.entity.UserTimezone;
import org.springframework.data.repository.CrudRepository;

public interface UserTimezoneRepository extends CrudRepository<UserTimezone, Long> {
}
