package com.maint.module.labor;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/technicians")
@RequiredArgsConstructor
public class LaborController {

    private final TechnicianRepository repo;

    @GetMapping
    public List<Technician> list() { return repo.findAll(); }

    @PostMapping
    public Technician create(@RequestBody Technician t) { return repo.save(t); }

    @GetMapping("/{id}")
    public ResponseEntity<Technician> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
