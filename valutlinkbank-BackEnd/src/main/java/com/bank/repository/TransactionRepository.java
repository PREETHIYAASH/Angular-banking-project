package com.bank.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bank.entity.Transaction;

@Repository            //repo is responsible for persistence
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	@Query(value="select * from transaction_table where account_num=?1",nativeQuery=true) //this query is placed above the method.
	 List <Transaction> getTransactionHistory(Long accountNum);
}
