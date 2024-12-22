package com.erriquez.lyra.controllers;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erriquez.lyra.models.ERole;
import com.erriquez.lyra.models.Role;
import com.erriquez.lyra.models.User;
import com.erriquez.lyra.models.UserPrincipal;
import com.erriquez.lyra.repositories.RoleRepository;
import com.erriquez.lyra.repositories.UserRepository;
import com.erriquez.lyra.request.LoginRequest;
import com.erriquez.lyra.request.SignupRequest;
import com.erriquez.lyra.response.JwtResponse;
import com.erriquez.lyra.response.MessageResponse;
import com.erriquez.lyra.services.UserService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    private ERole default_role = ERole.ROLE_TICKET_MANAGER;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = userService.getAuthentication(loginRequest);
        if (authentication.isAuthenticated()) {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            JwtResponse jwtResponse = userService.generateJwtResponse(userPrincipal.getUser());
            // SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok(jwtResponse);

        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        Set<Role> roles = new HashSet<>();

        if (signUpRequest.getRole() == null || signUpRequest.getRole().isEmpty()) {
            Optional<Role> userRole = roleRepository.findByName(default_role);

            if(userRole.isEmpty()){
                return ResponseEntity.badRequest().body("ERROR: Default role ROLE_USER not found");
            }
            roles.add(userRole.get());
            
        } else {
            Set<String> strRoles = signUpRequest.getRole().stream()
                    .map(role -> role.trim().toUpperCase())
                    .collect(Collectors.toSet());

           
            for (String roleStr : strRoles) {
                Optional<Role> role = roleRepository.findByName(ERole.valueOf(roleStr));

                if (role.isPresent()) {
                    roles.add(role.get());
                } else {
                    return ResponseEntity
                            .badRequest()
                            .body(new MessageResponse("Error: Role " + roleStr + " is not valid."));
                }
            }
        }

        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getBio(),
                signUpRequest.getProjectsAssigned(),
                new Date(), 
                0,
                roles);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}