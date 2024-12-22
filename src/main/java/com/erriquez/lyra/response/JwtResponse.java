package com.erriquez.lyra.response;

import java.util.Date;
import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private String bio;
    private String projectsAssigned;
    private Date registrationDate;
    private int reportSolved;

    public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles, String bio, String projectsAssigned, Date registrationDate, int reportSolved) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.bio=bio;
        this.projectsAssigned=projectsAssigned;
        this.registrationDate=registrationDate;
        this.reportSolved=reportSolved;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

    public String getAccessToken() {
        return token;
    }

    public void setAccessToken(String accessToken) {
        this.token = accessToken;
    }

    public String getTokenType() {
        return type;
    }

    public void setTokenType(String tokenType) {
        this.type = tokenType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public int getReportSolved() {
        return reportSolved;
    }

    public void setReportSolved(int reportSolved) {
        this.reportSolved = reportSolved;
    }
}