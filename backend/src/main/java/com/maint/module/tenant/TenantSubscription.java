package com.maint.module.tenant;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "tenant_subscriptions")
@Getter @Setter
public class TenantSubscription extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String planCode;

    private LocalDate startDate;
    private LocalDate endDate;
    private String billingCycle;
    private BigDecimal amount;

    @Column(nullable = false)
    private String status = "active";

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
