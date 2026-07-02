package com.maint.module.labor;

import com.maint.tenant.TenantAware;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "technicians")
@Getter @Setter
@EntityListeners(com.maint.tenant.TenantListener.class)
public class Technician extends TenantAware {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;

    private String employeeCode;
    private String jobTitle;
    private String department;
    private BigDecimal hourlyRate;
    private String shift;

    @Column(nullable = false)
    private String status = "available";

    private String phone;
    private String emergencyContact;

    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> skills;

    private Instant hireDate;
    private Instant createdAt = Instant.now();
}
