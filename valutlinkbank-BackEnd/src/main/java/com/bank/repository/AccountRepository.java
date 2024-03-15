package com.bank.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bank.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{
	Account  findByUserId(Integer userId);
    Account findByAccountNum(Long accountNum);
    
}


