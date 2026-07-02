package com.maint.module.asset;

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
@Table(name = "asset_categories")
@Getter @Setter
public class AssetCategory extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID parentId;

    @Column(nullable = false)
    private String name;

    private String code;
    private String description;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> schemaDefinition;

    private Instant createdAt = Instant.now();
}
