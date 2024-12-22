package com.erriquez.lyra.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.erriquez.lyra.models.Project;
import com.erriquez.lyra.services.ProjectService;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addProject")
    public ResponseEntity<Project> addProject(@RequestBody Project project){
        Project newProject= projectService.addProject(project);
        return new ResponseEntity<>(newProject, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TICKET_MANAGER')")
    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjects () {
        List<Project> projects = projectService.findAllProjects();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getNumberProjects () {
        long totalProjects = projectService.count();
        return new ResponseEntity<>(totalProjects, HttpStatus.OK);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/totalProjects")
    public ResponseEntity<?> getTotalProjects () {
        Long totalProjects = projectService.getTotalProjects();
        return new ResponseEntity<>(totalProjects, HttpStatus.OK);
    }

    @GetMapping("/prova/{supervisor}")
    public ResponseEntity<List<Project>> getAllProjectsSupervisor(@PathVariable("supervisor") String supervisor) {
        List<Project> projects = projectService.findAllProjectsSupervisor(supervisor);
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable("id") Long id) {
        projectService.deleteProject(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('TICKET_MANAGER')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Project> patchProject(@PathVariable("id") Long id, @RequestBody Project project){
        
        Optional<Project> optionalProject= projectService.findProjectById(id);

        if (optionalProject.isPresent()) {
            Project p = optionalProject.get();
            if (project.getCode() != null)
                p.setCode(project.getCode());
            if (project.getName() != null)
                p.setName(project.getName());
            if (project.getSupervisor() != null)
                p.setSupervisor(project.getSupervisor());
            if (project.getToken() != null)
                p.setToken(project.getToken());
            if (project.getTotalReports() != null)
                p.setTotalReports(project.getTotalReports());
            if (project.getOpenReports() != null)
                p.setOpenReports(project.getOpenReports());
            return new ResponseEntity<>(projectService.updateProject(p), HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
}
