package com.maint.module.facility;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FacilityController {

    private final SiteRepository siteRepo;
    private final BuildingRepository bldgRepo;

    @GetMapping("/sites")
    public List<Site> listSites() { return siteRepo.findAll(); }

    @PostMapping("/sites")
    public Site createSite(@RequestBody Site site) { return siteRepo.save(site); }

    @GetMapping("/sites/{id}/buildings")
    public List<Building> getBuildings(@PathVariable UUID id) {
        return bldgRepo.findBySiteId(id);
    }

    @PostMapping("/buildings")
    public Building createBuilding(@RequestBody Building bldg) { return bldgRepo.save(bldg); }
}
