package com.maint.module.asset;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "assets")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class Asset extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID categoryId;
    private UUID siteId;
    private UUID buildingId;
    private UUID zoneId;
    private UUID floorId;
    private UUID assignedTo;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String assetTag;

    private String serialNumber;
    private String manufacturer;
    private String model;
    private Integer yearManufactured;
    private LocalDate purchaseDate;
    private BigDecimal purchaseCost;
    private BigDecimal currentValue;
    private LocalDate warrantyExpiry;

    @Column(nullable = false)
    private String status = "operational";

    @Column(nullable = false)
    private String criticality = "medium";

    private String imageUrl;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> customAttributes;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
