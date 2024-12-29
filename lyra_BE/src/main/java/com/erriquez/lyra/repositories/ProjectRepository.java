package com.erriquez.lyra.repositories;

import com.erriquez.lyra.models.Project;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    void deleteProjectById(Long id);

    Optional<Project> findById(Long id);
    Optional<Project> findByName(String name);


    List<Project> findProjectBySupervisor(String supervisor);

    long count();

    @Query(value = "SELECT COUNT(id) FROM projects", nativeQuery = true)
    Integer totalProjects();


}
