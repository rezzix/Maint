package com.maint.module.purchasing;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "purchase_orders")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class PurchaseOrder extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID vendorId;
    private UUID requestedBy;
    private UUID approvedBy;

    @Column(unique = true, nullable = false)
    private String poNumber;

    @Column(nullable = false)
    private String status = "draft";

    private LocalDate orderDate;
    private LocalDate expectedDeliveryDate;
    private String paymentTerms;
    private BigDecimal subtotal = BigDecimal.ZERO;
    private BigDecimal taxAmount = BigDecimal.ZERO;
    private BigDecimal totalAmount = BigDecimal.ZERO;
    private String notes;
    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
