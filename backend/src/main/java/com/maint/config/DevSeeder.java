package com.maint.config;

import com.maint.module.asset.Asset;
import com.maint.module.asset.AssetCategory;
import com.maint.module.facility.*;
import com.maint.module.inventory.Part;
import com.maint.module.inventory.StockLevel;
import com.maint.module.labor.Technician;
import com.maint.module.pm.PMPlan;
import com.maint.module.pm.PMSchedule;
import com.maint.module.purchasing.POItem;
import com.maint.module.purchasing.PurchaseOrder;
import com.maint.module.tenant.Tenant;
import com.maint.module.tenant.TenantConfig;
import com.maint.module.tenant.TenantSubscription;
import com.maint.module.user.*;
import com.maint.module.vendor.Vendor;
import com.maint.module.workorder.WorkOrder;
import com.maint.module.workorder.WorkOrderTask;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.*;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DevSeeder implements CommandLineRunner {

    private final EntityManager em;
    private final PasswordEncoder passwordEncoder;

    private final Random rnd = new Random(42);

    @Override
    @Transactional
    public void run(String... args) {
        if (em.createQuery("SELECT COUNT(t) FROM Tenant t", Long.class).getSingleResult() > 0) {
            log.info("Database already seeded, skipping.");
            return;
        }

        log.info("Seeding dev database with rich test data...");

        var allPerms = createPermissions();

        // ─── TENANT A: ACME Production (enterprise, heavy) ────────────────
        var acme = seedTenant("ACME Production", "acme-prod", "enterprise", 50, 500);
        var acmeTid = acme.getId().toString();

        var acmeAdmin = createRole(acmeTid, "ADMIN", "Full access", true, allPerms);
        var acmeOper  = createRole(acmeTid, "OPERATOR", "Read-only", true,
                allPerms.stream().filter(p -> p.getAction().equals("read")).toList());
        var acmeTech  = createRole(acmeTid, "TECHNICIAN", "Maintenance", true,
                allPerms.stream().filter(p -> List.of("read", "update").contains(p.getAction())).toList());
        var acmeSuper = createRole(acmeTid, "SUPERVISOR", "Approval & oversight", false,
                allPerms.stream().filter(p -> !p.getAction().equals("delete")).toList());

        createUser(acmeTid, "admin@acme.com", "Sarah", "Chen", Set.of(acmeAdmin));
        createUser(acmeTid, "operator@acme.com", "Mike", "Ross", Set.of(acmeOper));
        createUser(acmeTid, "tech@acme.com", "Jake", "Sullivan", Set.of(acmeTech));
        createUser(acmeTid, "supervisor@acme.com", "Elena", "Khan", Set.of(acmeSuper));
        createUser(acmeTid, "engineer@acme.com", "Tom", "Nelson", Set.of(acmeTech, acmeOper));

        var acmeFacilities = seedFacilityHierarchy(acmeTid,
                List.of(
                        new FacilitySpec("ACME Main Plant", "AMP-01", "Detroit", "MI", 2, List.of("Building A","Building B"), List.of(3,2)),
                        new FacilitySpec("ACME Warehouse", "AWH-01", "Toledo", "OH", 1, List.of("Storage Hall"), List.of(1)),
                        new FacilitySpec("ACME R&D Lab", "ARD-01", "Ann Arbor", "MI", 1, List.of("Innovation Center"), List.of(2))
                ));
        var acmeCats = seedAssetCategories(acmeTid);
        var acmeAssets = seedAssets(acmeTid, "ACME", acmeCats, acmeFacilities, 22);
        seedWorkOrders(acmeTid, acmeAssets, 18);
        seedPMPlans(acmeTid, acmeAssets, 8);
        seedParts(acmeTid, 15);
        seedVendors(acmeTid, 3);
        seedPurchaseOrders(acmeTid, 4);
        seedTechnicians(acmeTid, 3);

        // ─── TENANT B: Globex Manufacturing (standard, medium) ────────────
        var globex = seedTenant("Globex Manufacturing", "globex-mfg", "standard", 20, 150);
        var globexTid = globex.getId().toString();

        var gAdmin  = createRole(globexTid, "ADMIN", "Full access", true, allPerms);
        var gMgr    = createRole(globexTid, "MANAGER", "Approval", true,
                allPerms.stream().filter(p -> !p.getAction().equals("delete")).toList());
        var gTech   = createRole(globexTid, "TECHNICIAN", "Maintenance", true,
                allPerms.stream().filter(p -> List.of("read", "update").contains(p.getAction())).toList());

        createUser(globexTid, "admin@globex.com", "Ahmed", "Omar", Set.of(gAdmin));
        createUser(globexTid, "manager@globex.com", "Lisa", "Brown", Set.of(gMgr));
        createUser(globexTid, "tech1@globex.com", "Carlos", "Mendez", Set.of(gTech));
        createUser(globexTid, "tech2@globex.com", "Wei", "Zhang", Set.of(gTech));

        var globexFacilities = seedFacilityHierarchy(globexTid,
                List.of(
                        new FacilitySpec("Globex Factory", "GF-01", "Manchester", "UK", 2, List.of("Main Hall","Packaging Wing"), List.of(2,1))
                ));
        var globexCats = seedAssetCategories(globexTid);
        var globexAssets = seedAssets(globexTid, "GLOBEX", globexCats, globexFacilities, 10);
        seedWorkOrders(globexTid, globexAssets, 8);
        seedPMPlans(globexTid, globexAssets, 4);
        seedParts(globexTid, 8);
        seedVendors(globexTid, 2);
        seedPurchaseOrders(globexTid, 2);
        seedTechnicians(globexTid, 2);

        // ─── TENANT C: Initech Services (standard, light) ─────────────────
        var initech = seedTenant("Initech Services", "initech-svc", "standard", 10, 50);
        var initechTid = initech.getId().toString();

        var iAdmin = createRole(initechTid, "ADMIN", "Full access", true, allPerms);
        var iTech  = createRole(initechTid, "TECHNICIAN", "Maintenance", true,
                allPerms.stream().filter(p -> List.of("read", "update").contains(p.getAction())).toList());

        createUser(initechTid, "admin@initech.com", "Priya", "Sharma", Set.of(iAdmin));
        createUser(initechTid, "tech@initech.com", "Dave", "Miller", Set.of(iTech));

        var initechFacilities = seedFacilityHierarchy(initechTid,
                List.of(
                        new FacilitySpec("Initech HQ", "IHQ-01", "Austin", "TX", 1, List.of("Office Tower"), List.of(5))
                ));
        var initechCats = seedAssetCategories(initechTid);
        var initechAssets = seedAssets(initechTid, "INITECH", initechCats, initechFacilities, 6);
        seedWorkOrders(initechTid, initechAssets, 4);
        seedPMPlans(initechTid, initechAssets, 2);
        seedParts(initechTid, 5);
        seedVendors(initechTid, 1);
        seedPurchaseOrders(initechTid, 1);
        seedTechnicians(initechTid, 1);

        log.info("Seeding complete: 3 tenants, 11 users, {} facilities, {} assets, {} WOs, {} parts, {} vendors",
                em.createQuery("SELECT COUNT(s) FROM Site s", Long.class).getSingleResult(),
                em.createQuery("SELECT COUNT(a) FROM Asset a", Long.class).getSingleResult(),
                em.createQuery("SELECT COUNT(w) FROM WorkOrder w", Long.class).getSingleResult(),
                em.createQuery("SELECT COUNT(p) FROM Part p", Long.class).getSingleResult(),
                em.createQuery("SELECT COUNT(v) FROM Vendor v", Long.class).getSingleResult());
    }

    // ─── HELPERS ──────────────────────────────────────────────────────────

    private Tenant seedTenant(String name, String slug, String tier, int maxU, int maxA) {
        var t = new Tenant();
        t.setName(name); t.setSlug(slug); t.setTier(tier); t.setMaxUsers(maxU); t.setMaxAssets(maxA);
        em.persist(t);
        var cfg = new TenantConfig();
        cfg.setTenantId(t.getId().toString()); cfg.setTimezone("UTC"); cfg.setCurrency("USD"); cfg.setLanguage("en");
        em.persist(cfg);
        var sub = new TenantSubscription();
        sub.setTenantId(t.getId().toString()); sub.setPlanCode(tier + "-annual");
        sub.setStartDate(LocalDate.now()); sub.setEndDate(LocalDate.now().plusYears(1));
        sub.setBillingCycle("monthly"); sub.setAmount(BigDecimal.valueOf(rnd.nextInt(500, 15000)));
        em.persist(sub);
        return t;
    }

    private List<Permission> createPermissions() {
        if (em.createQuery("SELECT COUNT(p) FROM Permission p", Long.class).getSingleResult() > 0)
            return em.createQuery("SELECT p FROM Permission p", Permission.class).getResultList();
        var actions = List.of("create","read","update","delete","approve","export");
        var modules = List.of("work_order","asset","pm","inventory","purchasing","vendor","facility","labor","reporting","audit");
        var perms = new ArrayList<Permission>();
        for (var mod : modules) for (var action : actions) {
            var p = new Permission(); p.setCode(mod+":"+action); p.setName(mod+" "+action); p.setModule(mod); p.setAction(action);
            em.persist(p); perms.add(p);
        }
        return perms;
    }

    private Role createRole(String tid, String name, String desc, boolean system, List<Permission> perms) {
        var r = new Role(); r.setTenantId(tid); r.setName(name); r.setDescription(desc); r.setSystem(system);
        r.setPermissions(new HashSet<>(perms)); em.persist(r); return r;
    }

    private void createUser(String tid, String email, String first, String last, Set<Role> roles) {
        var u = new User(); u.setTenantId(tid); u.setEmail(email);
        u.setPasswordHash(passwordEncoder.encode("password")); u.setFirstName(first); u.setLastName(last);
        u.setRoles(roles); em.persist(u);
    }

    // ─── FACILITIES ───────────────────────────────────────────────────────

    record FacilitySpec(String name, String code, String city, String state, int buildingCount, List<String> buildingNames, List<Integer> floorsPerBuilding) {}

    private Map<UUID, Map<UUID, Map<UUID, UUID>>> seedFacilityHierarchy(String tid, List<FacilitySpec> specs) {
        var result = new HashMap<UUID, Map<UUID, Map<UUID, UUID>>>();
        var buildingNames = List.of("Alpha","Beta","Gamma","Delta","Epsilon");
        var zoneCategories = List.of("production","storage","office","lab","restricted");
        for (var spec : specs) {
            var site = new Site(); site.setTenantId(tid); site.setName(spec.name); site.setCode(spec.code);
            site.setCity(spec.city); site.setState(spec.state); site.setCountry("USA");
            em.persist(site);
            var bldgMap = new HashMap<UUID, Map<UUID, UUID>>();
            for (int b = 0; b < spec.buildingCount; b++) {
                var bn = b < spec.buildingNames.size() ? spec.buildingNames.get(b) : buildingNames.get(b % buildingNames.size());
                var bldg = new Building(); bldg.setTenantId(tid); bldg.setSiteId(site.getId());
                bldg.setName(bn); bldg.setCode(spec.code + "-B" + (b+1));
                bldg.setTotalFloors(b < spec.floorsPerBuilding.size() ? spec.floorsPerBuilding.get(b) : 1);
                bldg.setType(b == 0 ? "production" : "office");
                em.persist(bldg);
                var zoneMap = new HashMap<UUID, UUID>();
                for (int z = 0; z < 2; z++) {
                    var zone = new Zone(); zone.setTenantId(tid); zone.setBuildingId(bldg.getId());
                    zone.setName(bn + " Zone " + (z+1));
                    zone.setCode(bldg.getCode() + "-Z" + (z+1));
                    zone.setCategory(zoneCategories.get((b+z) % zoneCategories.size()));
                    em.persist(zone);
                    var floor = new Floor(); floor.setTenantId(tid); floor.setBuildingId(bldg.getId());
                    floor.setName("Floor " + (z+1)); floor.setFloorNumber(z+1);
                    em.persist(floor);
                    zoneMap.put(zone.getId(), floor.getId());
                }
                bldgMap.put(bldg.getId(), zoneMap);
            }
            result.put(site.getId(), bldgMap);
        }
        return result;
    }

    // ─── ASSETS ───────────────────────────────────────────────────────────

    private List<AssetCategory> seedAssetCategories(String tid) {
        var catData = List.of(
                Map.of("name","Pumps","code","PUMP"),
                Map.of("name","Motors","code","MOT"),
                Map.of("name","HVAC","code","HVAC"),
                Map.of("name","Conveyors","code","CONV"),
                Map.of("name","Compressors","code","COMP")
        );
        var cats = new ArrayList<AssetCategory>();
        for (var d : catData) {
            var c = new AssetCategory(); c.setTenantId(tid);
            c.setName((String)d.get("name")); c.setCode((String)d.get("code"));
            em.persist(c); cats.add(c);
        }
        return cats;
    }

    private List<Asset> seedAssets(String tid, String prefix, List<AssetCategory> cats,
                                    Map<UUID, Map<UUID, Map<UUID, UUID>>> facilities, int count) {
        var manufacturers = List.of("Siemens","GE","ABB","Schneider","Bosch","Emerson","Honeywell");
        var models = List.of("X-100","Pro-2000","EcoLine","MaxSeries","Ultra-5","Prime-300");
        var statuses = List.of("operational","operational","operational","under-maintenance","broken","retired");
        var criticalities = List.of("low","medium","medium","high","critical");
        var assets = new ArrayList<Asset>();

        var sites = new ArrayList<>(facilities.keySet());
        for (int i = 0; i < count; i++) {
            var a = new Asset(); a.setTenantId(tid);
            a.setName(prefix + " " + cats.get(i % cats.size()).getName() + " #" + (i+1));
            a.setAssetTag(prefix + "-" + String.format("%04d", i+1));
            a.setSerialNumber("SN-" + prefix + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            a.setManufacturer(manufacturers.get(rnd.nextInt(manufacturers.size())));
            a.setModel(models.get(rnd.nextInt(models.size())) + "-" + (2020 + rnd.nextInt(5)));
            a.setCategoryId(cats.get(i % cats.size()).getId());
            a.setStatus(statuses.get(rnd.nextInt(statuses.size())));
            a.setCriticality(criticalities.get(rnd.nextInt(criticalities.size())));
            a.setPurchaseDate(LocalDate.now().minusMonths(rnd.nextInt(6, 48)));
            a.setPurchaseCost(BigDecimal.valueOf(rnd.nextInt(5000, 200000)));
            a.setWarrantyExpiry(LocalDate.now().plusMonths(rnd.nextInt(1, 24)));

            // assign to random facility
            var siteId = sites.get(rnd.nextInt(sites.size()));
            a.setSiteId(siteId);
            var bldgs = new ArrayList<>(facilities.get(siteId).keySet());
            if (!bldgs.isEmpty()) {
                var bldgId = bldgs.get(rnd.nextInt(bldgs.size()));
                a.setBuildingId(bldgId);
                var zones = new ArrayList<>(facilities.get(siteId).get(bldgId).keySet());
                if (!zones.isEmpty()) {
                    a.setZoneId(zones.get(rnd.nextInt(zones.size())));
                }
            }
            em.persist(a); assets.add(a);
        }
        log.info("  Seeded {} assets for {}", assets.size(), prefix);
        return assets;
    }

    // ─── WORK ORDERS ──────────────────────────────────────────────────────

    private void seedWorkOrders(String tid, List<Asset> assets, int count) {
        var types = List.of("corrective","corrective","preventive","emergency");
        var priorities = List.of("low","medium","medium","high","critical");
        var statuses = List.of("open","assigned","in-progress","on-hold","completed","completed","closed","cancelled");
        var failureCodes = List.of("MECH-001","ELEC-045","HYDR-012","LUBE-008","VIBR-023","","");
        var taskDescriptions = List.of(
                "Inspect and clean component","Replace worn gasket","Lubricate moving parts",
                "Check electrical connections","Tighten bolts to spec","Calibrate sensor",
                "Test safety mechanisms","Update firmware","Replace filter","Check fluid levels");

        for (int i = 0; i < count; i++) {
            var asset = assets.get(i % assets.size());
            var wo = new WorkOrder(); wo.setTenantId(tid);
            wo.setAssetId(asset.getId());
            wo.setSiteId(asset.getSiteId());
            wo.setWoNumber("WO-" + tid.substring(0, 4).toUpperCase() + "-" + String.format("%04d", i+1));
            wo.setTitle(statuses.get(rnd.nextInt(statuses.size())).equals("completed")
                    ? "Repair " + asset.getName() : "Scheduled maintenance - " + asset.getName());
            wo.setDescription("Work order for " + asset.getName() + " (" + asset.getAssetTag() + "). " +
                    "Issue reported: " + failureCodes.get(rnd.nextInt(failureCodes.size())) + ". " +
                    "Requires standard maintenance procedures.");
            wo.setType(types.get(rnd.nextInt(types.size())));
            wo.setPriority(priorities.get(rnd.nextInt(priorities.size())));
            var status = statuses.get(rnd.nextInt(statuses.size()));
            wo.setStatus(status);
            wo.setTargetDate(LocalDate.now().plusDays(rnd.nextInt(-10, 20)));
            wo.setEstimatedHours(BigDecimal.valueOf(rnd.nextInt(2, 24)));
            if (List.of("completed","closed").contains(status)) {
                wo.setActualHours(BigDecimal.valueOf(rnd.nextDouble() * 20 + 1));
                wo.setCompletedAt(Instant.now().minusSeconds(rnd.nextInt(86400 * 30)));
                wo.setResolutionNotes("Completed successfully. All tests passed.");
            }
            em.persist(wo);

            // create 2-4 tasks per WO
            int taskCount = 2 + rnd.nextInt(3);
            for (int t = 0; t < taskCount; t++) {
                var task = new WorkOrderTask(); task.setTenantId(tid);
                task.setWorkOrderId(wo.getId());
                task.setSequence(t+1);
                task.setDescription(taskDescriptions.get((i + t) % taskDescriptions.size()));
                task.setEstimatedHours(BigDecimal.valueOf(rnd.nextInt(1, 6)));
                task.setStatus(List.of("completed","completed","pending","in-progress").get(rnd.nextInt(4)));
                if (task.getStatus().equals("completed"))
                    task.setActualHours(BigDecimal.valueOf(rnd.nextDouble() * 4 + 1));
                em.persist(task);
            }
        }
        log.info("  Seeded {} work orders for tenant", count);
    }

    // ─── PM PLANS ─────────────────────────────────────────────────────────

    private void seedPMPlans(String tid, List<Asset> assets, int count) {
        var daysOfWeek = List.of("MON","MON,WED","WED,FRI","FRI");
        for (int i = 0; i < count; i++) {
            var plan = new PMPlan(); plan.setTenantId(tid);
            plan.setAssetId(assets.get(i % assets.size()).getId());
            plan.setName("PM-" + (i+1) + " - " + assets.get(i % assets.size()).getName());
            plan.setDescription("Preventive maintenance plan. Includes inspection, cleaning, and calibration.");
            plan.setPriority(List.of("low","medium","high").get(rnd.nextInt(3)));
            plan.setStatus("active");
            plan.setRequiresShutdown(rnd.nextBoolean());
            plan.setEstimatedDurationMinutes(rnd.nextInt(30, 240));
            em.persist(plan);

            // 1-2 schedules per plan
            int schedCount = 1 + rnd.nextInt(2);
            for (int s = 0; s < schedCount; s++) {
                var sched = new PMSchedule(); sched.setTenantId(tid);
                sched.setPmPlanId(plan.getId());
                sched.setTriggerType(s == 0 ? "time" : "meter");
                sched.setIntervalValue(List.of(7, 14, 30, 90, 180).get(rnd.nextInt(5)));
                sched.setIntervalUnit("days");
                sched.setStartDate(LocalDate.now().minusMonths(6));
                sched.setLeadDays(List.of(3, 7, 14).get(rnd.nextInt(3)));
                sched.setDayOfWeek(daysOfWeek.get(rnd.nextInt(daysOfWeek.size())));
                em.persist(sched);
            }
        }
        log.info("  Seeded {} PM plans for tenant", count);
    }

    // ─── PARTS / INVENTORY ────────────────────────────────────────────────

    private void seedParts(String tid, int count) {
        var partNames = List.of(
                "Ball Bearing 6205","Oil Filter HF-4","V-Belt A-45","Hydraulic Seal Kit",
                "Pressure Gauge 0-100psi","Copper Washer M10","Relay 24VDC","Fuse 10A Fast-Blow",
                "LED Indicator Green","Spring Washer M12","O-Ring Kit 50pc","Fan Blade 12\"",
                "Thermostat NTC 10K","Solenoid Valve 24V","Gasket Sheet 1mm");
        var uoms = List.of("each","each","meter","each","each","pack","each","pack","each","pack","kit","each","each","each","sheet");
        var categories = List.of("mechanical","filters","mechanical","hydraulic","instrumentation","hardware","electrical","electrical","electrical","hardware","mechanical","mechanical","instrumentation","electrical","mechanical");

        for (int i = 0; i < count && i < partNames.size(); i++) {
            var p = new Part(); p.setTenantId(tid);
            p.setName(partNames.get(i));
            p.setPartNumber("PN-" + tid.substring(0, 4).toUpperCase() + "-" + String.format("%03d", i+1));
            p.setSku("SKU-" + (1000 + i));
            p.setUnitOfMeasure(uoms.get(i));
            p.setUnitCost(BigDecimal.valueOf(rnd.nextInt(5, 500)));
            p.setCategory(categories.get(i));
            p.setManufacturer(List.of("SKF","Donaldson","Gates","Parker","Wika","Bosch").get(rnd.nextInt(6)));
            em.persist(p);

            // stock level for this part
            var sl = new StockLevel(); sl.setTenantId(tid);
            sl.setPartId(p.getId());
            sl.setQuantityOnHand(rnd.nextInt(0, 200));
            sl.setQuantityReserved(rnd.nextInt(0, 20));
            sl.setReorderPoint(rnd.nextInt(5, 30));
            sl.setReorderQuantity(rnd.nextInt(10, 100));
            sl.setBinLocation("Aisle-" + (char)('A' + rnd.nextInt(5)) + "-" + (rnd.nextInt(1, 20)));
            em.persist(sl);
        }
        log.info("  Seeded {} parts for tenant", count);
    }

    // ─── VENDORS ──────────────────────────────────────────────────────────

    private void seedVendors(String tid, int count) {
        var prefix = tid.substring(0, 4).toUpperCase();
        var vendorData = List.of(
                List.of("Industrial Supply Co.","supplier"),
                List.of("MRO Direct","supplier"),
                List.of("TechParts Global","manufacturer"),
                List.of("Precision Components Ltd","contractor"),
                List.of("Maintenance Pro Inc","supplier")
        );
        for (int i = 0; i < count && i < vendorData.size(); i++) {
            var v = new Vendor(); v.setTenantId(tid);
            v.setName(vendorData.get(i).get(0));
            v.setCode(prefix + "-V" + String.format("%03d", i+1));
            v.setStatus("active");
            v.setCategory(vendorData.get(i).get(1));
            v.setPaymentTermsDays(List.of(30, 45, 60).get(rnd.nextInt(3)));
            v.setCurrency("USD");
            v.setCreditLimit(BigDecimal.valueOf(rnd.nextInt(10000, 100000)));
            em.persist(v);
        }
    }

    // ─── PURCHASE ORDERS ──────────────────────────────────────────────────

    private void seedPurchaseOrders(String tid, int count) {
        var vendors = em.createQuery("SELECT v FROM Vendor v WHERE v.tenantId = :tid", Vendor.class)
                .setParameter("tid", tid).getResultList();
        var parts = em.createQuery("SELECT p FROM Part p WHERE p.tenantId = :tid", Part.class)
                .setParameter("tid", tid).getResultList();
        if (vendors.isEmpty() || parts.isEmpty()) return;

        var statuses = List.of("draft","pending_approval","approved","sent","received","cancelled");
        for (int i = 0; i < count; i++) {
            var po = new PurchaseOrder(); po.setTenantId(tid);
            po.setVendorId(vendors.get(i % vendors.size()).getId());
            po.setPoNumber("PO-" + tid.substring(0, 4).toUpperCase() + "-" + String.format("%04d", i+1));
            var status = statuses.get(rnd.nextInt(statuses.size()));
            po.setStatus(status);
            po.setOrderDate(LocalDate.now().minusDays(rnd.nextInt(1, 60)));
            po.setExpectedDeliveryDate(LocalDate.now().plusDays(rnd.nextInt(1, 30)));
            po.setPaymentTerms("Net 30");
            po.setNotes("Routine order for maintenance parts.");
            em.persist(po);

            // 2-4 line items
            int itemCount = 2 + rnd.nextInt(3);
            BigDecimal total = BigDecimal.ZERO;
            for (int j = 0; j < itemCount && j < parts.size(); j++) {
                var item = new POItem(); item.setTenantId(tid);
                item.setPoId(po.getId());
                item.setPartId(parts.get(j).getId());
                item.setLineNumber(j+1);
                item.setDescription(parts.get(j).getName());
                item.setQuantityOrdered(rnd.nextInt(2, 20));
                item.setQuantityReceived(status.equals("received") ? item.getQuantityOrdered() : rnd.nextInt(0, item.getQuantityOrdered()));
                item.setUnitPrice(parts.get(j).getUnitCost());
                item.setLineTotal(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantityOrdered())));
                total = total.add(item.getLineTotal());
                em.persist(item);
            }
            po.setTotalAmount(total);
        }
    }

    // ─── TECHNICIANS ──────────────────────────────────────────────────────

    private void seedTechnicians(String tid, int count) {
        var techData = List.of(
                List.of("TCH-001","Senior Technician","Mechanical","welding,hydraulic,pneumatic"),
                List.of("TCH-002","Electrician","Electrical","electrical,plc,hvac"),
                List.of("TCH-003","Junior Technician","Mechanical","lubrication,inspection"),
                List.of("TCH-004","Instrumentation Tech","Instrumentation","calibration,sensors,plc")
        );
        // find users who are TECHNICIANs
        var users = em.createQuery("SELECT u FROM User u WHERE u.tenantId = :tid", User.class)
                .setParameter("tid", tid).getResultList();
        // skip the first user (admin) and map tech roles
        var techUsers = users.stream()
                .filter(u -> u.getRoles().stream().anyMatch(r -> r.getName().equals("TECHNICIAN")))
                .toList();

        for (int i = 0; i < count && i < techData.size(); i++) {
            var t = new Technician(); t.setTenantId(tid);
            t.setUserId(!techUsers.isEmpty() ? techUsers.get(i % techUsers.size()).getId() : users.get(0).getId());
            t.setEmployeeCode(techData.get(i).get(0));
            t.setJobTitle(techData.get(i).get(1));
            t.setDepartment(techData.get(i).get(2));
            t.setHourlyRate(BigDecimal.valueOf(rnd.nextInt(25, 65)));
            t.setShift(List.of("day","day","night","rotating").get(rnd.nextInt(4)));
            t.setStatus(List.of("available","available","busy","busy","off-duty").get(rnd.nextInt(5)));
            t.setSkills(List.of(techData.get(i).get(3).split(",")));
            t.setHireDate(Instant.now().minusSeconds(rnd.nextInt(365 * 5) * 86400L));
            t.setPhone("+1-555-" + (1000 + rnd.nextInt(9000)));
            em.persist(t);
        }
        log.info("  Seeded {} technicians for tenant", count);
    }
}
