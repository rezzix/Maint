package com.maint.module.tenant;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "tenant_configs")
@Getter @Setter
public class TenantConfig extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String timezone = "UTC";

    private String dateFormat = "YYYY-MM-DD";
    private String currency = "USD";
    private String language = "en";
    private boolean allowSelfRegistration;
    private Instant updatedAt = Instant.now();
}
