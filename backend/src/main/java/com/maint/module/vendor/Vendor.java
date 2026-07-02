package com.maint.module.vendor;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "vendors")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class Vendor extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String code;

    private String taxId;
    private String website;

    @Column(nullable = false)
    private String status = "active";

    private String category;
    private BigDecimal creditLimit;
    private Integer paymentTermsDays;
    private String currency;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
