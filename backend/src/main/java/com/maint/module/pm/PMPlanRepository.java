package com.maint.module.pm;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PMPlanRepository extends JpaRepository<PMPlan, UUID> {
}
