package com.maint.module.vendor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/vendors")
@RequiredArgsConstructor
public class VendorController {

    private final VendorRepository repo;

    @GetMapping
    public List<Vendor> list() { return repo.findAll(); }

    @PostMapping
    public Vendor create(@RequestBody Vendor vendor) { return repo.save(vendor); }

    @GetMapping("/{id}")
    public ResponseEntity<Vendor> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
