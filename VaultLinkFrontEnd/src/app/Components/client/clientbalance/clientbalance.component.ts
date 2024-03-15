import { Component } from '@angular/core';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-clientbalance',
  templateUrl: './clientbalance.component.html',
  styleUrl: './clientbalance.component.css'
})
export class ClientbalanceComponent {
  amount: any;
  accountNum: any = localStorage.getItem('accountNumber');
  constructor(
    private accountService: AccountService
  ) { 
    console.log('>>>>>>>>xxxx>>');
  }

  ngOnInit(): void {
    const acctNum = localStorage.getItem('accountNumber');
    if (acctNum !== null) {
      this.getAccountBalance(acctNum);
    } else {
      const userId = localStorage.getItem('uId');
      this.accountService.getAccountByUserId(userId).subscribe(
        (data: any) => {
          const accno = data.accountNum;
          localStorage.setItem('accountNumber', accno);
          this.getAccountBalance(accno);
        });
    }

  }

  getAccountBalance(acctNum: any): void {
    this.accountService.getBalanceByaccounNum(acctNum).subscribe(
      (data: any) => {
        this.amount = data;
      }
    );
  }
}
