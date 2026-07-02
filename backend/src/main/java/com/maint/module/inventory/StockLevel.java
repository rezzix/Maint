package com.maint.module.inventory;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "stock_levels")
@Getter @Setter
public class StockLevel extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID partId;

    private UUID warehouseId;
    private Integer quantityOnHand = 0;
    private Integer quantityReserved = 0;
    private Integer reorderPoint = 0;
    private Integer reorderQuantity = 0;
    private String binLocation;
    private Instant lastCountedAt;
}
