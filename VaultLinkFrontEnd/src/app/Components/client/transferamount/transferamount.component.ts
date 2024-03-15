import { Component } from '@angular/core';
import { AccountService } from '../../../account.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-transferamount',
  templateUrl: './transferamount.component.html',
  styleUrl: './transferamount.component.css'
})
export class TransferamountComponent {
  accountNum: any = localStorage.getItem('accountNumber');
  accountNum2: any;
  transferAmt: any;
  currentBlanace: number = 0;
  remark: string = '';
  errorMessage: string  = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.accountService.getAccountByAccountId(this.accountNum).pipe(take(1)).subscribe((res: any) => {
      if (res && res?.accountBal) {
        this.currentBlanace = res?.accountBal;
      }
    });
  }





  submitTransferForm() {
    if (this.accountNum2.toString().length < 6) {
      this.errorMessage = 'Account should be more than 6 chracter';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
      // alert("Account should be more than 6 chracter");
      // return;
    }
    if (this.accountNum === this.accountNum2) {
      this.errorMessage = 'Transfer to same account is not allowed.';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
      // alert("Transfer to same account is not allowed.");
      // return;
    }
    if (this.transferAmt < 0) {
      this.errorMessage = 'Nagative amount is not allowed';
      document.getElementById('errordiv')?.scrollIntoView(true);
      // alert("Nagative amount is not allowed");
      return;
    }
    console.log('>>>>>', this.transferAmt);
    if (this.transferAmt === "0") {
      this.errorMessage = 'Zero amount is not allowed';
      document.getElementById('errordiv')?.scrollIntoView(true);
      //alert("Zero amount is not allowed");
      return;
    }
    if (this.transferAmt > this.currentBlanace) {
      //alert("You do not have sufficient blance for do this transaction. Please check your balance before transaction.");
      this.errorMessage = 'You do not have sufficient balance for do this transaction. Please check your balance before transaction.';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    this.errorMessage = '';
    this.accountService.getAccountByAccountId(this.accountNum2).pipe(take(1)).subscribe((res: any) => {
      if (res === null) {
        alert("Recipient Account is not avaiable, Please check account number before transaction.");
      } else {
        this.accountService.transaction(this.accountNum, this.accountNum2, this.transferAmt, this.remark)
          .subscribe(
            () => {
              alert("Amount has been transferred successfully.");
              this.accountNum2 = '';
              this.transferAmt = '';
              this.router.navigate(['/clientbalance']);
            },
            (error: any) => {
              console.log('Error from server:', error);
              this.accountNum2 = '';
              this.transferAmt = '';
              alert("Failed to transfer amount. Please try again.");
            }
          );

      }
    });

  }

}
