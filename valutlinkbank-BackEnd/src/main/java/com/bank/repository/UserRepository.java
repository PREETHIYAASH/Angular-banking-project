package com.bank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.entity.User;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	public User findByUsernameAndPass(String username,String pass); 
	public User findByUsername(String username);
	List<User> findByFirstNameContainingIgnoreCase(String searchText);
}