package com.maint.module.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepo;
    private final RoleRepository roleRepo;

    @GetMapping("/users")
    public List<User> listUsers() { return userRepo.findAll(); }

    @GetMapping("/roles")
    public List<Role> listRoles() { return roleRepo.findAll(); }
}
