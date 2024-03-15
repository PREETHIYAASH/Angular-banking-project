package com.bank.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;  //is for @autowired
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.entity.Transaction;
import com.bank.entity.Account;
import com.bank.entity.TransactionDetails;
import com.bank.service.AccountService;
import com.bank.service.UserService;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountController {
	
	private final AccountService accountService; //obj of account service

    @Autowired
    public AccountController(AccountService accountService, UserService userService) {
        this.accountService = accountService;
    }
    
    @GetMapping("/{userId}/acc")
    public ResponseEntity<Account> getAccountByUserId(@PathVariable Integer userId) {
        Account account = accountService.getAccountByUserId(userId);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }
    
    @PostMapping("/{accountNum}/deposit")
    public ResponseEntity<?> deposit(@PathVariable Long accountNum, @RequestBody double amount) {
        accountService.deposit(accountNum, amount);
        return new ResponseEntity<>("Amount Deposited successful", HttpStatus.OK);
    }
    
    @PostMapping("/{fromAccountNum}/transact")
    public ResponseEntity<String> Transaction(
    		@PathVariable Long fromAccountNum,
    		@RequestBody Map<String, Object> requestBody) {
    	
    	Long toAccountNum = Long.parseLong(requestBody.get("toAccountNum").toString());
        double amount = Double.parseDouble(requestBody.get("amount").toString());
        String remark = requestBody.get("remark").toString();
        accountService.Transaction(fromAccountNum, toAccountNum, amount, remark);
        return new ResponseEntity<>("Transaction completed successfully", HttpStatus.OK);
    }
    @GetMapping("/{accountNum}/balance")
    public ResponseEntity<Double> getAccountBalance(@PathVariable Long accountNum) {
        double balance = accountService.getAccountBalance(accountNum);
        return new ResponseEntity<>(balance, HttpStatus.OK);
    }
    @GetMapping("/{accountNum}/history")
    public List<Transaction> getTransactionHistory(@PathVariable Long accountNum) 
    {
    	System.out.println("working");
        return  accountService.getTransactionHistory(accountNum);
        //return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
    
    //
    @GetMapping({"/createTransaction/{amount}"})
    public TransactionDetails createTransaction(@PathVariable(name = "amount") Double amount) {
        return accountService.doCreateTransaction(amount);
    }
    
    @PostMapping("/getAccount/{accountNum}")
    public ResponseEntity<Account> deposit(@PathVariable Long accountNum) {
        Account ac = accountService.getAccountByAccountId(accountNum);
        return new ResponseEntity<>(ac, HttpStatus.OK);
    }

}