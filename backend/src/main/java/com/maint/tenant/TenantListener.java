package com.maint.tenant;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

public class TenantListener {

    @PrePersist
    @PreUpdate
    public void setTenant(Object entity) {
        if (entity instanceof TenantAware ta && ta.getTenantId() == null) {
            ta.setTenantId(TenantContext.getTenantId());
        }
    }
}
