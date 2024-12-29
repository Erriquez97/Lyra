package com.erriquez.lyra.services;

import com.erriquez.lyra.models.User;
import com.erriquez.lyra.models.UserPrincipal;
import com.erriquez.lyra.repositories.UserRepository;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username);
        if (user.isEmpty()) {
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("user not found");
        }
        Hibernate.initialize(user.get().getRoles());
        return new UserPrincipal(user.get());
    }


    
    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id){
        userRepository.deleteUserById(id);
    }

    public Optional<User> findUserById(Long id){ return userRepository.findById(id);}

    public Long getTotalUsers(){
        return userRepository.count();
    }
}
