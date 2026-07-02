package com.maint.module.inventory;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final PartRepository partRepo;
    private final StockLevelRepository stockRepo;

    @GetMapping("/parts")
    public List<Part> listParts() { return partRepo.findAll(); }

    @PostMapping("/parts")
    public Part createPart(@RequestBody Part part) { return partRepo.save(part); }

    @GetMapping("/parts/{id}/stock")
    public List<StockLevel> getStock(@PathVariable UUID id) {
        return stockRepo.findByPartId(id);
    }

    @GetMapping("/low-stock")
    public List<StockLevel> getLowStock() {
        return stockRepo.findAll().stream()
                .filter(s -> s.getQuantityOnHand() <= s.getReorderPoint())
                .toList();
    }
}
