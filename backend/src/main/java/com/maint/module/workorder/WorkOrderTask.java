package com.maint.module.workorder;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "work_order_tasks")
@Getter @Setter
public class WorkOrderTask extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID workOrderId;

    private UUID assignedTo;
    private Integer sequence;

    @Column(length = 4000)
    private String description;

    @Column(nullable = false)
    private String status = "pending";

    private BigDecimal estimatedHours;
    private BigDecimal actualHours;
    private Instant completedAt;
}
