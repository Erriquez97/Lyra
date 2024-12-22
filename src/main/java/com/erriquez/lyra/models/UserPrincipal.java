package com.erriquez.lyra.models;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserPrincipal implements UserDetails {

    private User user;

    public UserPrincipal(User user){
        this.user=user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName().toString())).toList();
    }
  
    @Override
    public String getPassword() {
        return user.getPassword();
    }
    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public String toString() {
        return "Username: "+ user.getUsername() +", email: "+ user.getEmail()+", password: "+user.getPassword();  
    }

    @Override
    public boolean isAccountNonExpired(){
        return true;
    }   

    @Override
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired(){
        return true;

    }

    @Override
    public boolean isEnabled(){
        return true;

    }

    public User getUser(){
        return this.user;
    }

    
}
