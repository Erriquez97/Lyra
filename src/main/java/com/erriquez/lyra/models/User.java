package com.erriquez.lyra.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.persistence.JoinColumn;



@Entity
@Table(	name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;

    @Size(max = 320)
    private String bio;

    @Size(max = 120)
    private String projectsAssigned;

    private String registrationDate;

    private int reportsSolved;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public User() {
    }

    public User(Long id, String username, String email, String password, String bio, String projectsAssigned, String registrationDate,int reportsSolved, Set<Role> roles) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.projectsAssigned = projectsAssigned;
        this.registrationDate=registrationDate;
        this.reportsSolved=reportsSolved;
        this.roles = roles;
    }

    public User(String username, String email, String password, String projectsAssigned, String bio, String registrationDate, int reportsSolved) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.bio = bio;
        this.projectsAssigned = projectsAssigned;
        this.registrationDate=registrationDate;
        this.reportsSolved=reportsSolved;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getProjectsAssigned() {
        return projectsAssigned;
    }

    public void setProjectsAssigned(String projectsAssigned) {
        this.projectsAssigned = projectsAssigned;
    }

    public String getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(String registrationDate) {
        this.registrationDate = registrationDate;
    }

    public int getReportsSolved() {
        return reportsSolved;
    }

    public void setReportsSolved(int reportsSolved) {
        this.reportsSolved = reportsSolved;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}