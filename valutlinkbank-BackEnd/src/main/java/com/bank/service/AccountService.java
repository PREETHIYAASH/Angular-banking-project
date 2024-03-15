package com.bank.service;

import java.util.List;

import com.bank.entity.Account;
import com.bank.entity.Transaction;
import com.bank.entity.TransactionDetails;
public interface AccountService {
	Account getAccountByUserId(Integer userId);
    Account createAccount(Account account);
    void deposit(Long accountNum, double amount);
    void Transaction(Long fromAccountNum, Long toAccountNum, double amount, String remark);
    double getAccountBalance(Long accountNum);
    List <Transaction> getTransactionHistory(Long accountNum);
    TransactionDetails doCreateTransaction(Double amount);
    Account getAccountByAccountId(long userId);

}

 