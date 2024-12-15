package com.erriquez.lyra.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.erriquez.lyra.models.User;



@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findById(Long id);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    void deleteUserById(Long id);

    long count();

    @Query(value = "SELECT COUNT(id) FROM users", nativeQuery = true)
    Integer totalUsers();

}