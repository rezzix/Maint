package com.maint.module.workorder;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WorkOrderTaskRepository extends JpaRepository<WorkOrderTask, UUID> {
    List<WorkOrderTask> findByWorkOrderIdOrderBySequence(UUID workOrderId);
}
