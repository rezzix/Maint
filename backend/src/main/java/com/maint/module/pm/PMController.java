package com.maint.module.pm;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/pm-plans")
@RequiredArgsConstructor
public class PMController {

    private final PMPlanRepository repo;
    private final PMScheduleRepository schedRepo;

    @GetMapping
    public List<PMPlan> list() { return repo.findAll(); }

    @PostMapping
    public PMPlan create(@RequestBody PMPlan plan) { return repo.save(plan); }

    @GetMapping("/{id}")
    public ResponseEntity<PMPlan> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PMPlan> update(@PathVariable UUID id, @RequestBody PMPlan plan) {
        return repo.findById(id).map(existing -> {
            plan.setId(id);
            return ResponseEntity.ok(repo.save(plan));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/schedules")
    public List<PMSchedule> getSchedules(@PathVariable UUID id) {
        return schedRepo.findByPmPlanId(id);
    }

    @PostMapping("/{id}/schedules")
    public PMSchedule addSchedule(@PathVariable UUID id, @RequestBody PMSchedule sched) {
        sched.setPmPlanId(id);
        return schedRepo.save(sched);
    }
}
