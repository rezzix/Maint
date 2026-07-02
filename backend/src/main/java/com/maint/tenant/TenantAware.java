package com.maint.tenant;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter @Setter
public abstract class TenantAware {

    @Column(nullable = false)
    private String tenantId;
}
