package com.maint.module.workorder;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/work-orders")
@RequiredArgsConstructor
public class WorkOrderController {

    private final WorkOrderRepository repo;
    private final WorkOrderTaskRepository taskRepo;

    @GetMapping
    public List<WorkOrder> list() { return repo.findAll(); }

    @PostMapping
    public WorkOrder create(@RequestBody WorkOrder wo) { return repo.save(wo); }

    @GetMapping("/{id}")
    public ResponseEntity<WorkOrder> get(@PathVariable UUID id) {
        return repo.findById(id).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkOrder> update(@PathVariable UUID id, @RequestBody WorkOrder wo) {
        return repo.findById(id).map(existing -> {
            wo.setId(id);
            return ResponseEntity.ok(repo.save(wo));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/tasks")
    public List<WorkOrderTask> getTasks(@PathVariable UUID id) {
        return taskRepo.findByWorkOrderIdOrderBySequence(id);
    }

    @PostMapping("/{id}/tasks")
    public WorkOrderTask addTask(@PathVariable UUID id, @RequestBody WorkOrderTask task) {
        task.setWorkOrderId(id);
        return taskRepo.save(task);
    }
}
