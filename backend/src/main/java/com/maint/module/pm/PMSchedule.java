package com.maint.module.pm;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "pm_schedules")
@Getter @Setter
public class PMSchedule extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID pmPlanId;

    @Column(nullable = false)
    private String triggerType = "time";

    private Integer intervalValue;
    private String intervalUnit;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer leadDays;
    private String dayOfWeek;
    private Integer dayOfMonth;
}
