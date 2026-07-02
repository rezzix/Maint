package com.maint.tenant;

import org.hibernate.context.spi.CurrentTenantIdentifierResolver;
import org.springframework.stereotype.Component;

@Component
public class TenantInterceptor implements CurrentTenantIdentifierResolver<String> {

    @Override
    public String resolveCurrentTenantIdentifier() {
        var id = TenantContext.getTenantId();
        return id != null ? id : "public";
    }

    @Override
    public boolean validateExistingCurrentSessions() {
        return false;
    }
}
