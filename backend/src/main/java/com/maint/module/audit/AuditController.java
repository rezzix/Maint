package com.maint.module.audit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/audit-logs")
@RequiredArgsConstructor
public class AuditController {

    private final AuditLogRepository repo;

    @GetMapping
    public List<AuditLog> list() { return repo.findAll(); }
}
