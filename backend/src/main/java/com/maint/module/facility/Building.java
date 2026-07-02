package com.maint.module.facility;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "buildings")
@Getter @Setter
public class Building extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID siteId;

    @Column(nullable = false)
    private String name;

    private String code;
    private int totalFloors;
    private String type;
    private Instant createdAt = Instant.now();
}
