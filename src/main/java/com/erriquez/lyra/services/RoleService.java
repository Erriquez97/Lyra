package com.erriquez.lyra.services;

import org.springframework.stereotype.Service;

import com.erriquez.lyra.models.ERole;
import com.erriquez.lyra.models.Role;
import com.erriquez.lyra.repositories.RoleRepository;

import jakarta.annotation.PostConstruct;

@Service
public class RoleService {

    private RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository){
        this.roleRepository = roleRepository;

    }

    @PostConstruct
    private void init(){
        for(ERole erole: ERole.values()){
            if(!roleRepository.findByName(erole).isPresent()){
                Role role = new Role(erole);
                roleRepository.save(role);
            }
        }

    }    
}
