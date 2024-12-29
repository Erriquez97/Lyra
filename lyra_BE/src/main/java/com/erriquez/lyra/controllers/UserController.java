package com.erriquez.lyra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.erriquez.lyra.models.User;
import com.erriquez.lyra.request.ChangePasswordRequest;
import com.erriquez.lyra.services.UserDetailsServiceImpl;

import java.util.List;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    PasswordEncoder encoder;

    private final UserDetailsServiceImpl userDetailsService;

    public UserController(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers () {
        List<User> users = userDetailsService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/totalUsers")
    public ResponseEntity<?> getTotalUsers () {
        Long totalUsers = userDetailsService.getTotalUsers();
        return new ResponseEntity<>(totalUsers, HttpStatus.OK);
    }
    
    @PreAuthorize("#id == principal.id or hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userDetailsService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PreAuthorize("#id == principal.id or hasRole('ADMIN')")
    @PutMapping("/changePassword/{id}")
    public ResponseEntity<User> changePassword(@PathVariable("id") Long id, @RequestBody ChangePasswordRequest changeRequest) {
        Optional<User> optionalUser = userDetailsService.findUserById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (encoder.matches(changeRequest.getOldPassword(),user.getPassword())) {
                user.setPassword(encoder.encode(changeRequest.getNewPassword()));
                return new ResponseEntity<>(userDetailsService.updateUser(user), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PreAuthorize("#id == principal.id or hasr hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody User user){
        Optional<User> optionalUser= userDetailsService.findUserById(id);
        if (optionalUser.isPresent()) {
            User u = optionalUser.get();
            if (user.getUsername() != null)
                u.setUsername(user.getUsername());
            if (user.getEmail() != null)
                u.setEmail(user.getEmail());
            if (user.getPassword() != null)
                u.setPassword(user.getPassword());
            if (user.getBio() != null)
                u.setBio(user.getBio());
            if (user.getProjectsAssigned() != null)
                u.setProjectsAssigned(user.getProjectsAssigned());
            if (user.getRegistrationDate() != null)
                u.setRegistrationDate(user.getRegistrationDate());
            if (user.getReportsSolved() != 0)
                u.setReportsSolved(user.getReportsSolved());
            return new ResponseEntity<>(userDetailsService.updateUser(u), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
