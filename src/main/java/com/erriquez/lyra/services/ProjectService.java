package com.erriquez.lyra.services;

import com.erriquez.lyra.models.Project;
import com.erriquez.lyra.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project addProject(Project project){
        //project.setId(UUID.randomUUID().toString());
        project.setOpenReports(0);
        project.setTotalReports(0);
        return projectRepository.save(project);
    }

    public List<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public List<Project> findAllProjectsSupervisor(String supervisor){
        return projectRepository.findProjectBySupervisor(supervisor);
    }

    public long count(){
        return projectRepository.count();
    }


    public Long getTotalProjects(){
        return projectRepository.count();
    }


    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id){ projectRepository.deleteProjectById(id); }

    public Optional<Project> findProjectById(Long id){ return projectRepository.findById(id);}

    public Optional<Project> findProjectByName(String name){ return projectRepository.findByName(name);}
}
