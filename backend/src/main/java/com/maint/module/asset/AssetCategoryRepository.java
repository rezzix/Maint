package com.maint.module.asset;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AssetCategoryRepository extends JpaRepository<AssetCategory, UUID> {
}
