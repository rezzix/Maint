package com.maint.module.workorder;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "work_orders")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class WorkOrder extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID assetId;
    private UUID siteId;
    private UUID pmPlanId;
    private UUID requestedBy;
    private UUID assignedTo;
    private UUID approvedBy;

    @Column(unique = true, nullable = false)
    private String woNumber;

    @Column(nullable = false)
    private String title;

    @Column(length = 4000)
    private String description;

    @Column(nullable = false)
    private String type = "corrective";

    @Column(nullable = false)
    private String priority = "medium";

    @Column(nullable = false)
    private String status = "open";

    private LocalDate targetDate;
    private Instant startedAt;
    private Instant completedAt;
    private BigDecimal estimatedHours;
    private BigDecimal actualHours;
    private BigDecimal estimatedCost;
    private BigDecimal actualCost;
    private String failureCode;

    @Column(length = 4000)
    private String resolutionNotes;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
