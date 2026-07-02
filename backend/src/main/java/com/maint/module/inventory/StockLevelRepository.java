package com.maint.module.inventory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StockLevelRepository extends JpaRepository<StockLevel, UUID> {
    List<StockLevel> findByPartId(UUID partId);
}
