package com.maint.module.user;

import com.maint.security.JwtService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dev")
@Profile("dev")
@RequiredArgsConstructor
public class DevAuthController {

    private final UserRepository userRepo;
    private final JwtService jwtService;

    @GetMapping("/users")
    public ResponseEntity<List<TenantGroup>> listUsers() {
        var users = userRepo.findAll();
        var grouped = users.stream()
                .collect(Collectors.groupingBy(
                        u -> u.getTenantId(),
                        Collectors.groupingBy(u -> u.getRoles().stream()
                                .findFirst().map(Role::getName).orElse("NONE"))
                ));
        var result = new ArrayList<TenantGroup>();
        grouped.forEach((tenantId, roleMap) -> {
            var group = new TenantGroup();
            group.setTenantId(tenantId);
            var roles = new ArrayList<RoleGroup>();
            roleMap.forEach((role, usrs) -> {
                var rg = new RoleGroup();
                rg.setRole(role);
                rg.setUsers(usrs.stream().map(u -> {
                    var dto = new UserDto();
                    dto.setId(u.getId().toString());
                    dto.setEmail(u.getEmail());
                    dto.setName(u.getFirstName() + " " + (u.getLastName() != null ? u.getLastName() : ""));
                    dto.setRole(role);
                    return dto;
                }).toList());
                roles.add(rg);
            });
            group.setRoles(roles);
            result.add(group);
        });
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login/{userId}")
    public ResponseEntity<?> devLogin(@PathVariable UUID userId) {
        var user = userRepo.findById(userId).orElse(null);
        if (user == null) return ResponseEntity.status(404).build();
        var roles = user.getRoles().stream().map(Role::getName).toList();
        var accessToken = jwtService.generateAccessToken(
                user.getId().toString(), user.getTenantId(), roles);
        var refreshToken = jwtService.generateRefreshToken(user.getId().toString());
        return ResponseEntity.ok(new AuthController.AuthResponse(
                accessToken, refreshToken, user.getTenantId(),
                user.getId().toString(), user.getEmail(),
                user.getFirstName(), roles));
    }

    @Data
    public static class TenantGroup {
        private String tenantId;
        private List<RoleGroup> roles;
    }

    @Data
    public static class RoleGroup {
        private String role;
        private List<UserDto> users;
    }

    @Data
    public static class UserDto {
        private String id;
        private String email;
        private String name;
        private String role;
    }
}
