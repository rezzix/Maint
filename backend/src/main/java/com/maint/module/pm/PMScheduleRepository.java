package com.maint.module.pm;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PMScheduleRepository extends JpaRepository<PMSchedule, UUID> {
    List<PMSchedule> findByPmPlanId(UUID pmPlanId);
}
