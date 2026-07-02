package com.maint.module.facility;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "sites")
@Getter @Setter
public class Site extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String code;

    private String addressLine1;
    private String city;
    private String state;
    private String country;
    private String status = "active";
    private Instant createdAt = Instant.now();
}
