package com.erriquez.lyra.services;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.DependsOn;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.erriquez.lyra.models.ERole;
import com.erriquez.lyra.models.Role;
import com.erriquez.lyra.models.User;
import com.erriquez.lyra.repositories.RoleRepository;
import com.erriquez.lyra.repositories.UserRepository;
import com.erriquez.lyra.request.LoginRequest;
import com.erriquez.lyra.response.JwtResponse;

import jakarta.annotation.PostConstruct;

@Service
@DependsOn("roleService")
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;

    @PostConstruct
    private void init_db() {

        if (userRepository.count() == 0) {

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
            Set<Role> roles = new HashSet<>();
            roles.add(roleRepository.findByName(ERole.ROLE_ADMIN).get());
            User user_admin = new User("admin", "admin@gmail.com", encoder.encode("password"), "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu risus vel eros porta imperdiet ac dignissim nisi. Nunc id erat non ipsum blandit vulputate ac ut dolor.", 
             "Lyra",
                new Date(), 0, roles);
                userRepository.save(user_admin);
        }
    }

    public Authentication getAuthentication(LoginRequest loginRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        return authentication;
    }

    public JwtResponse generateJwtResponse(User user){

        String jwtToken = jwtService.generateToken(user.getEmail());

        List<String> roles = user.getRoles().stream().map(role -> role.getName().toString()).toList();

        return new JwtResponse(
            jwtToken,
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            roles,
            user.getBio(),
            user.getProjectsAssigned(),
            user.getRegistrationDate(),
            user.getReportsSolved()
            );
    }

}
