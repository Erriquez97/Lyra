package com.erriquez.lyra.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;



@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    @Column(name = "code", length = 20)
    private String code;

    @NotBlank
    @Size(max = 20)
    @Column(name = "name", length = 20)
    private String name;

    @NotBlank
    @Size(max = 30)
    @Column(name = "supervisor", length = 30)
    private String supervisor;

    @NotBlank
    @Size(max = 10)
    @Column(name = "token", length = 10)
    private String token;

    @NotBlank
    @Column(name = "total_reports")
    private Integer totalReports;

    @NotBlank
    @Column(name = "open_reports")
    private Integer openReports;

    // Default constructor
    public Project() {}

    // Constructor with all fields
    public Project(Long id, String code, String name, String supervisor, String token, Integer totalReports, Integer openReports) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.supervisor = supervisor;
        this.token = token;
        this.totalReports = totalReports;
        this.openReports = openReports;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Integer getTotalReports() {
        return totalReports;
    }

    public void setTotalReports(Integer totalReports) {
        this.totalReports = totalReports;
    }

    public Integer getOpenReports() {
        return openReports;
    }

    public void setOpenReports(Integer openReports) {
        this.openReports = openReports;
    }
}
