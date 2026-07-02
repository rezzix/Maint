package com.maint.module.asset;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/assets")
@RequiredArgsConstructor
public class AssetController {

    private final AssetRepository repo;
    private final AssetCategoryRepository catRepo;

    @GetMapping
    public List<Asset> list() { return repo.findAll(); }

    @PostMapping
    public Asset create(@RequestBody Asset a) { return repo.save(a); }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> update(@PathVariable UUID id, @RequestBody Asset a) {
        return repo.findById(id).map(existing -> {
            a.setId(id);
            return ResponseEntity.ok(repo.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/categories")
    public List<AssetCategory> listCategories() { return catRepo.findAll(); }

    @PostMapping("/categories")
    public AssetCategory createCategory(@RequestBody AssetCategory c) { return catRepo.save(c); }
}
