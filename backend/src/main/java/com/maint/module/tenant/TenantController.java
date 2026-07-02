package com.maint.module.tenant;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/tenants")
@RequiredArgsConstructor
public class TenantController {

    private final TenantRepository repo;

    @GetMapping
    public List<Tenant> list() { return repo.findAll(); }

    @PostMapping
    public Tenant create(@RequestBody Tenant t) { return repo.save(t); }

    @GetMapping("/{id}")
    public ResponseEntity<Tenant> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
