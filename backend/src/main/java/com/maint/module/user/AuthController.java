package com.maint.module.user;

import com.maint.security.JwtService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepo;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var user = userRepo.findByEmail(req.getEmail()).orElse(null);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(new ErrorResponse("Invalid credentials"));
        }
        var roles = user.getRoles().stream().map(Role::getName).toList();
        var accessToken = jwtService.generateAccessToken(
                user.getId().toString(), user.getTenantId(), roles);
        var refreshToken = jwtService.generateRefreshToken(user.getId().toString());
        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken,
                user.getTenantId(), user.getId().toString(), user.getEmail(),
                user.getFirstName(), roles));
    }

    @Data
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @Data
    public static class AuthResponse {
        private final String accessToken;
        private final String refreshToken;
        private final String tenantId;
        private final String userId;
        private final String email;
        private final String name;
        private final List<String> roles;
    }

    @Data
    public static class ErrorResponse {
        private final String message;
    }
}
