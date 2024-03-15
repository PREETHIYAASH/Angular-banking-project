package com.bank.serviceimplementation;             //HERE ONLY WE HAVE TO IMPORT TRANSACTION,TRANSACTIONDETAILS ENTITY

import java.time.LocalDateTime;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entity.Transaction;
import com.bank.entity.TransactionDetails;
import com.bank.exception.AuthenticationException;
import com.bank.exception.UserNotFoundException;
import com.bank.entity.Account;
import com.bank.repository.AccountRepository;
import com.bank.repository.TransactionRepository;
import com.bank.service.AccountService;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
	public class AcountServiceImpl implements AccountService {
	    private static final String KEY = "rzp_test_AXBzvN2fkD4ESK";
	    private static final String KEY_SECRET = "bsZmiVD7p1GMo6hAWiy4SHSH";
	    private static final String CURRENCY = "INR";
    @Autowired
	private final AccountRepository accountRepository;
	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	public AcountServiceImpl(AccountRepository accountRepository, TransactionRepository transactionRepository) {
		this.accountRepository = accountRepository;
		this.transactionRepository = transactionRepository;
	}

	@Override
	public Account getAccountByUserId(Integer userId) {
		Account account = accountRepository.findByUserId(userId);
		if (account == null) {
			throw new UserNotFoundException("Account not found for userId: " + userId);
		}

		return account;
	}

	@Override
	public Account createAccount(Account account) {
		return accountRepository.save(account);
	}

	@Override
	public void deposit(Long accountNum, double amount) {
		Account account = accountRepository.findByAccountNum(accountNum);
		if (account == null) {
			throw new UserNotFoundException("Account not found with accountNum: " + accountNum);
		}

		double currentBalance = account.getAccountBal();
		double newBalance = currentBalance + amount;
		account.setAccountBal(newBalance);
		accountRepository.save(account);

		// Create a new Transaction entity for the deposit
		Transaction depositTransaction = new Transaction(amount, "DEPOSIT", LocalDateTime.now(), "");

		// Set the relationship between the Transaction and the account
		depositTransaction.setAccount(account);

		// Add the deposit transaction to the transaction history of the account
		account.getTransactionHistory().add(depositTransaction);

		// Save the account to persist the changes
		accountRepository.save(account);
	}

	@Override
	public void Transaction(Long fromAccountNum, Long toAccountNum, double amount, String remark) {

		Account fromAccount = accountRepository.findByAccountNum(fromAccountNum);
		if (fromAccount == null) {
			throw new UserNotFoundException("From Account not found with accountNum: " + fromAccountNum);
		}

		Account toAccount = accountRepository.findByAccountNum(toAccountNum);
		if (toAccount == null) {
			throw new UserNotFoundException("To Account not found with accountNum: " + toAccountNum);
		}

		if (fromAccount.getAccountBal() < amount) {
			throw new AuthenticationException("Insufficient account balance");
		}

		// Create a new Transaction entity for the transfer
		Transaction transaction = new Transaction(amount, "DEBIT", LocalDateTime.now(), remark);

		// Create a new Transaction entity for the transfer
		Transaction transactionTo = new Transaction(amount, "DEPOSIT", LocalDateTime.now(), remark);

		transaction.setAccount(fromAccount);
		transactionTo.setAccount(toAccount);

		// Add the transaction to the transaction history of both accounts
		fromAccount.getTransactionHistory().add(transaction);
		toAccount.getTransactionHistory().add(transactionTo);

		// Update the account balances
		fromAccount.setAccountBal(fromAccount.getAccountBal() - amount);
		toAccount.setAccountBal(toAccount.getAccountBal() + amount);

		// Save both accounts to persist the changes
		accountRepository.save(fromAccount);
		accountRepository.save(toAccount);
	}

	@Override
	public double getAccountBalance(Long accountNum) {
		Account account = accountRepository.findByAccountNum(accountNum);
		if (account == null) {
			throw new UserNotFoundException("Account not found with accountNum: " + accountNum);
		}
		return account.getAccountBal();
	}
	
	@Override
	public TransactionDetails doCreateTransaction(Double amount) {
     try {

         JSONObject jsonObject = new JSONObject();
         jsonObject.put("amount", (amount * 100) );
         jsonObject.put("currency", CURRENCY);

         RazorpayClient razorpayClient = new RazorpayClient(KEY, KEY_SECRET);

         Order order = razorpayClient.orders.create(jsonObject);

         TransactionDetails transactionDetails =  prepareTransactionDetails(order);
         return transactionDetails;
     } catch (Exception e) {
         System.out.println(e.getMessage());
     }
     return null;
 }
	
	private TransactionDetails prepareTransactionDetails(Order order) {
     String orderId = order.get("id");
     String currency = order.get("currency");
     Integer amount = order.get("amount");

     TransactionDetails transactionDetails = new TransactionDetails(orderId, currency, amount, KEY);
     return transactionDetails;
 }

	@Override
	public List<Transaction> getTransactionHistory(Long accountNum) {
		return this.transactionRepository.getTransactionHistory(accountNum);

		
	}
	
	@Override
	public  Account getAccountByAccountId(long accountNum) {
		Account account = accountRepository.findByAccountNum(accountNum);
		return account;
	}
}
