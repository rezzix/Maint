package com.maint.module.facility;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "zones")
@Getter @Setter
public class Zone extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID buildingId;

    @Column(nullable = false)
    private String name;

    private String code;
    private String category;
    private String safetyRequirements;
    private Instant createdAt = Instant.now();
}
