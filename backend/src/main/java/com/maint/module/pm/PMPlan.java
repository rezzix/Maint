package com.maint.module.pm;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "pm_plans")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class PMPlan extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID assetId;
    private UUID siteId;

    @Column(nullable = false)
    private String name;

    @Column(length = 4000)
    private String description;

    @Column(nullable = false)
    private String priority = "medium";

    @Column(nullable = false)
    private String status = "active";

    private Boolean requiresShutdown;
    private Integer estimatedDurationMinutes;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
