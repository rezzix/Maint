package com.maint.module.audit;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

@Entity
@Table(name = "audit_logs")
@Getter @Setter
public class AuditLog extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String entityType;

    @Column(nullable = false)
    private UUID entityId;

    @Column(nullable = false)
    private String eventType;

    private String action;
    private String performedBy;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> previousState;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> newState;

    private String sourceIp;
    private Instant createdAt = Instant.now();
}
