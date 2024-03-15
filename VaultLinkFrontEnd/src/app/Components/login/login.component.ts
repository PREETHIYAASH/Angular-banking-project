import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  pass:string = '';
  cpass:string='';
  user: User=new User(0,"","","","","","","","", "","", false, "");
  errorMessage: string = '';
  showForgotPassword: boolean = false;
  isFormSubmitted: boolean = false;
  loginForm = new FormGroup<any>({});
   constructor(private authService: AuthService, private router: Router,private fb:FormBuilder) {
     //const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; 
     this.loginForm = this.fb.group({
       username: ['', [Validators.required]],
       pass: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
     });
}
onSubmit() {
  this.user.username=this.loginForm.controls['username'].value;
  this.user.pass=this.loginForm.controls['pass'].value;
  console.log("******",this.user);
  
  this.authService.loginUser(this.user).subscribe(
    (response: any) => {
      if (response?.activateAccount === false) {
        alert("Your account is not activated . Please check after some time.")
      } else {
        this.authService.storeLoggedInUser(this.user);
        localStorage.setItem('uname', this.user?.username);
        localStorage.setItem('uId', response?.id);
        localStorage.setItem('role', response?.role);
        if (response?.role === 'user') {
         this.router.navigate(['/clienthome']);
        } else {
         this.router.navigate(['/adminDashboard']);
        }
      }
      
    },
    (error: any) => {
      console.error('Login failed:', error);
      if (error.status === 401 || error.status === 404) {
        this.errorMessage = 'Invalid username or password';
      } else {
        this.errorMessage = 'An unexpected error occurred. Please try again later.';
      }
    }
  );
}
showForgotPasswordOverlay() {
  this.showForgotPassword = true;
}
hideForgotPasswordOverlay() {
  this.showForgotPassword = false;
  this.username='';
  this.pass='';
  this.cpass= '';
}  
hideForgotPassword(){
  this.showForgotPassword = false;
}
onForgotPasswordSubmit() {
  if (!this.user.username || !this.user.pass || !this.user.cpass) {
    this.errorMessage = 'Please fill in all the required fields.';
    return;
  }

  if (this.user.pass.length < 5) {
    this.errorMessage = 'New Password must be at least 5 characters long.';
    return;
  }

  if (this.user.pass !== this.user.cpass) {
    this.errorMessage = 'Passwords do not match.';
    return;
  }

  // Reset the error message when the form is valid
  this.errorMessage = '';

  // Proceed with the password update logic here
  this.authService.updateUserByUsername(this.user.username, this.user).subscribe(
    (response: User) => {
      console.log("Password successfully updated!", response);
      this.resetForm(); // Reset form fields
      this.showForgotPassword = false;
      window.alert('Password updated successfully!');
    },
    (error) => {
      console.log('>>>>', error)
      if (error?.error.includes('does not exist!')) {
        console.error('User does not exists.');
        this.errorMessage = 'User does not exists.';
      } else {
        console.error('Error updating password', error);
        this.errorMessage = 'Error updating password. Please try again.';
        window.alert('Error updating password. Please try again.');
      }
     
      this.resetForm();
     
    }
  );
}
resetForm() {

  this.user.username = '';
  this.user.pass = '';
  this.user.cpass = '';
}


}


