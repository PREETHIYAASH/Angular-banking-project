import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router from @angular/router
// import { User } from '../../user';
import { take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { User } from '../../user';
// import { User } from '../../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string  = '';
  user: User =new User(0,"","","","","","","","","","",false,"");
  // user: User = new this.user(0,"","","","","","","","","", "", false, "");
  minDate: any;
  constructor(private authService: AuthService, private router: Router ) {
    const todayDate = new Date();
    this.minDate = (todayDate?.getFullYear() - 18) + '-' + (todayDate?.getMonth() + 1) + '-' + todayDate?.getDate();
  }
 
  onSubmit() {
    if (this.user.firstName === '') {
      this.errorMessage = 'First name should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    if (this.user.firstName.length <3 ) {
      this.errorMessage = 'First name should be more than 3 chracter';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!mobilePattern.test(this.user.mobileno)) {
      //alert('Mobile numbner should start between 6 to 9. And it should be valid mobile number.');
      this.errorMessage = 'Mobile number should start between 6 to 9 and it should be valid mobile number.';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return
    }
    if (this.user.email === '' ) {
      this.errorMessage = 'Email should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    const regularExpression = /^[_A-Za-z0-9-\\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
    if (!regularExpression.test(this.user.email)) {
      document.getElementById('errordiv')?.scrollIntoView(true);
      this.errorMessage = 'Email is not valid';
      return;
    }
    if (this.user.address === '' ) {
      this.errorMessage = 'Address should not be blank';
      document.getElementById('errordiv')?.scrollIntoView(true);
      return;
    }
    const passwordPatter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!passwordPatter.test(this.user.pass)) {
      alert('Password must have minimum eight characters, at least one letter and one number, one special chracter');
      return
    }
    if (this.user.pass !== this.user.cpass) {
      document.getElementById('errordiv')?.scrollIntoView(true);
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.errorMessage = '';
    console.log(this.user);
  // this.user.role = "admin";
   this.user.role = "user"; 
    this.authService.registerUser(this.user).pipe(take(1)).subscribe(
      (data:any ) => {
        alert("User created with account");
        this.router.navigate(['/login']);
      }, error => {
       
        const message = error?.error?.message;
        console.log("************",message)
        if (message && message.includes('[Duplicate entry ')) {
          alert("Username / Email / Mobile already available. Please use differnt one.");
        } else {
          alert("Something went wrong while registration.");
        }
      }
      
    )
  }

  goBack() {
    this.router.navigate(['/login']); // Replace 'login' with the actual path to your login page
  }
}
