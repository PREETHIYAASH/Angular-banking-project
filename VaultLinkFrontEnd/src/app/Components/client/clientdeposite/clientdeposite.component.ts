import { Component } from '@angular/core';
import { AccountService } from '../../../account.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
declare const Razorpay: any;

@Component({
  selector: 'app-clientdeposite',
  templateUrl: './clientdeposite.component.html',
  styleUrl: './clientdeposite.component.css'
})
export class ClientdepositeComponent {
  depositA: any;
  errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  doTransaction(): void {
    if (this.depositA === undefined || this.depositA === 0 ||this.depositA==='') {
      //alert("Please add Amount more than 0 .");
      this.errorMessage = 'Please add amount more than 0 ';
      document.getElementById('errordiv')?.scrollIntoView(true);
      
      return;
    }
    if (this.depositA < 0) {
      // alert("Nagative amount is not allowed");
      this.errorMessage = 'Nagative amount is not allowed';
      document.getElementById('errordiv')?.scrollIntoView(true);
      
      return;
    }
    this.errorMessage = '';
    
  
    this.accountService.createTransaction(this.depositA).pipe(take(1)).subscribe((res: any) => {
      console.log('>>>>>', res);
      if (res && res?.orderId) {
        this.openTransactioModal(res);
      }
    });
  }

  openTransactioModal(response: any) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Payment mode online',
      description: 'Payment mode online ',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        console.log('####', response);
        if (response != null && response.razorpay_payment_id != null) {
          this.submitDepositForm();
        } else {
          alert("Payment failed..")
        }
      },
      prefill: {
        name: 'LPY',
        email: 'LPY@GMAIL.COM',
        contact: '9004380734'
      },
      notes: {
        address: 'Online Banking'
      },
      theme: {
        color: '#F37254'
      }
    };
    try {
      const razorPayObject = new Razorpay(options);
      razorPayObject.open();
    } catch (e) {
      console.log('>>>>>>>eeee>>>', e)
    }

  }

  submitDepositForm(): void {
    const accountNum = localStorage.getItem('accountNumber');
    this.accountService.depositAmtToAccountNum(accountNum, this.depositA).subscribe(
      () => {
        this.depositA = '';
        alert("Amount Deposited Successfully");
        this.router.navigate(['/clientbalance']);
      }
    )
  }


}
