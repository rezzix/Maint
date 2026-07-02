package com.maint.module.tenant;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "tenants")
@Getter @Setter
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String slug;

    private String domain;
    private String logoUrl;

    @Column(nullable = false)
    private String status = "active";

    @Column(nullable = false)
    private String tier = "standard";

    private int maxUsers = 10;
    private int maxAssets = 50;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> settings;

    private Instant createdAt = Instant.now();
    private Instant updatedAt = Instant.now();
}
