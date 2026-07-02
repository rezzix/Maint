package com.maint.module.inventory;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "parts")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class Part extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String partNumber;

    private String sku;
    private String description;
    private String unitOfMeasure = "each";
    private BigDecimal unitCost;
    private String category;
    private String manufacturer;

    @Column(nullable = false)
    private String status = "active";

    private Boolean consumable;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> specifications;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
