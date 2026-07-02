package com.maint.module.purchasing;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/purchase-orders")
@RequiredArgsConstructor
public class PurchaseOrderController {

    private final PurchaseOrderRepository repo;

    @GetMapping
    public List<PurchaseOrder> list() { return repo.findAll(); }

    @PostMapping
    public PurchaseOrder create(@RequestBody PurchaseOrder po) { return repo.save(po); }

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseOrder> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
