package com.maint.config;

import com.maint.module.facility.Building;
import com.maint.module.facility.Site;
import com.maint.module.facility.SiteRepository;
import com.maint.module.tenant.Tenant;
import com.maint.module.tenant.TenantConfig;
import com.maint.module.tenant.TenantRepository;
import com.maint.module.tenant.TenantSubscription;
import com.maint.module.user.*;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Component
@Profile("dev")
@RequiredArgsConstructor
@Slf4j
public class DevSeeder implements CommandLineRunner {

    private final TenantRepository tenantRepo;
    private final UserRepository userRepo;
    private final RoleRepository roleRepo;
    private final PermissionRepository permRepo;
    private final SiteRepository siteRepo;
    private final PasswordEncoder passwordEncoder;
    private final EntityManager em;

    @Override
    @Transactional
    public void run(String... args) {
        if (tenantRepo.count() > 0) {
            log.info("Database already seeded, skipping.");
            return;
        }

        log.info("Seeding dev database...");

        // Permissions
        var allPerms = createPermissions();

        // --- Tenant A: ACME Production ---
        var acme = createTenant("ACME Production", "acme-prod", "enterprise", 20, 100);
        createTenantConfig(acme.getId().toString(), "America/New_York", "USD", "en");
        createSubscription(acme.getId().toString(), "enterprise-annual", BigDecimal.valueOf(12000));

        var adminRole = createRole(acme.getId().toString(), "ADMIN", "Full access", true, allPerms);
        var operatorRole = createRole(acme.getId().toString(), "OPERATOR", "Read-only operations", true,
                allPerms.stream().filter(p -> p.getAction().equals("read")).toList());
        var techRole = createRole(acme.getId().toString(), "TECHNICIAN", "Maintenance technician", true,
                allPerms.stream().filter(p -> List.of("read", "update").contains(p.getAction())).toList());

        createUser(acme.getId().toString(), "admin@acme.com", "Admin", "User", "ADMIN", Set.of(adminRole));
        createUser(acme.getId().toString(), "operator@acme.com", "Oper", "User", "OPERATOR", Set.of(operatorRole));
        createUser(acme.getId().toString(), "tech@acme.com", "Tech", "User", "TECHNICIAN", Set.of(techRole));

        var acmeSite1 = createSite(acme.getId().toString(), "ACME Main Plant", "ACME-01", "123 Industrial Blvd", "Detroit", "MI", "USA");
        var acmeSite2 = createSite(acme.getId().toString(), "ACME Warehouse", "ACME-02", "456 Logistics Ave", "Toledo", "OH", "USA");
        createBuilding(acme.getId().toString(), acmeSite1.getId(), "Building A", "BLD-A", 3, "production");
        createBuilding(acme.getId().toString(), acmeSite1.getId(), "Building B", "BLD-B", 2, "office");

        // --- Tenant B: Globex Manufacturing ---
        var globex = createTenant("Globex Manufacturing", "globex-mfg", "standard", 10, 50);
        createTenantConfig(globex.getId().toString(), "Europe/London", "GBP", "en");
        createSubscription(globex.getId().toString(), "standard-monthly", BigDecimal.valueOf(500));

        var gAdminRole = createRole(globex.getId().toString(), "ADMIN", "Full access", true, allPerms);
        var gManagerRole = createRole(globex.getId().toString(), "MANAGER", "Approval & oversight", true,
                allPerms.stream().filter(p -> !p.getAction().equals("delete")).toList());

        createUser(globex.getId().toString(), "admin@globex.com", "Admin", "Globex", "ADMIN", Set.of(gAdminRole));
        createUser(globex.getId().toString(), "manager@globex.com", "Manager", "Globex", "MANAGER", Set.of(gManagerRole));

        var globexSite = createSite(globex.getId().toString(), "Globex Factory", "GLB-01", "789 Production Road", "Manchester", "England", "UK");
        createBuilding(globex.getId().toString(), globexSite.getId(), "Main Hall", "MH-1", 2, "production");

        // --- Tenant C: Initech Services ---
        var initech = createTenant("Initech Services", "initech-svc", "standard", 5, 20);
        createTenantConfig(initech.getId().toString(), "America/Chicago", "USD", "en");
        createSubscription(initech.getId().toString(), "standard-monthly", BigDecimal.valueOf(300));

        var iAdminRole = createRole(initech.getId().toString(), "ADMIN", "Full access", true, allPerms);
        createUser(initech.getId().toString(), "admin@initech.com", "Admin", "Initech", "ADMIN", Set.of(iAdminRole));

        var initechSite = createSite(initech.getId().toString(), "Initech HQ", "INT-01", "321 Corporate Dr", "Austin", "TX", "USA");
        createBuilding(initech.getId().toString(), initechSite.getId(), "Office Tower", "OT-1", 5, "office");

        log.info("Seeding complete: 3 tenants, {} users, {} sites, {} buildings",
                userRepo.count(), siteRepo.count(), em.createQuery("SELECT COUNT(b) FROM Building b").getSingleResult());
    }

    private List<Permission> createPermissions() {
        var actions = List.of("create", "read", "update", "delete", "approve", "export");
        var modules = List.of("work_order", "asset", "pm", "inventory", "purchasing", "vendor", "facility", "labor", "reporting", "audit");
        if (permRepo.count() > 0) return permRepo.findAll();

        var perms = modules.stream().flatMap(mod ->
                actions.stream().map(action -> {
                    var p = new Permission();
                    p.setCode(mod + ":" + action);
                    p.setName(mod + " " + action);
                    p.setModule(mod);
                    p.setAction(action);
                    return p;
                })
        ).toList();
        return permRepo.saveAll(perms);
    }

    private Tenant createTenant(String name, String slug, String tier, int maxUsers, int maxAssets) {
        var t = new Tenant();
        t.setName(name);
        t.setSlug(slug);
        t.setTier(tier);
        t.setMaxUsers(maxUsers);
        t.setMaxAssets(maxAssets);
        return tenantRepo.save(t);
    }

    private void createTenantConfig(String tenantId, String tz, String currency, String lang) {
        var c = new TenantConfig();
        c.setTenantId(tenantId);
        c.setTimezone(tz);
        c.setCurrency(currency);
        c.setLanguage(lang);
        em.persist(c);
    }

    private void createSubscription(String tenantId, String plan, BigDecimal amount) {
        var s = new TenantSubscription();
        s.setTenantId(tenantId);
        s.setPlanCode(plan);
        s.setStartDate(LocalDate.now());
        s.setEndDate(LocalDate.now().plusYears(1));
        s.setBillingCycle("monthly");
        s.setAmount(amount);
        em.persist(s);
    }

    private Role createRole(String tenantId, String name, String desc, boolean system, List<Permission> perms) {
        var r = new Role();
        r.setTenantId(tenantId);
        r.setName(name);
        r.setDescription(desc);
        r.setSystem(system);
        r.setPermissions(new java.util.HashSet<>(perms));
        return roleRepo.save(r);
    }

    private void createUser(String tenantId, String email, String first, String last, String roleName, Set<Role> roles) {
        var u = new User();
        u.setTenantId(tenantId);
        u.setEmail(email);
        u.setPasswordHash(passwordEncoder.encode("password"));
        u.setFirstName(first);
        u.setLastName(last);
        u.setRoles(roles);
        userRepo.save(u);
    }

    private Site createSite(String tenantId, String name, String code, String addr, String city, String state, String country) {
        var s = new Site();
        s.setTenantId(tenantId);
        s.setName(name);
        s.setCode(code);
        s.setAddressLine1(addr);
        s.setCity(city);
        s.setState(state);
        s.setCountry(country);
        return siteRepo.save(s);
    }

    private void createBuilding(String tenantId, UUID siteId, String name, String code, int floors, String type) {
        var b = new Building();
        b.setTenantId(tenantId);
        b.setSiteId(siteId);
        b.setName(name);
        b.setCode(code);
        b.setTotalFloors(floors);
        b.setType(type);
        em.persist(b);
    }
}
