import { Component } from '@angular/core';
import { User } from '../../../user';
import { AuthService } from '../../../auth.service';
import { AccountService } from '../../../account.service';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrl: './clienthome.component.css'
})
export class ClienthomeComponent {
  firstName: any; // Initialize the firstName property
  lastName: any;
  user: User=new User(0,"","","","","","","","", "","", false, "");
  loggedInUser: User | null = null;
  userId: any;
  accountNum:any;
  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    // Retrieve the logged-in user from AuthService
    this.loggedInUser = this.authService.getLoggedInUser();
    this.firstName=localStorage.getItem('uname');
    this.userId=localStorage.getItem('uId');
    this.accountService.getAccountByUserId(this.userId).subscribe( 
      (data:any)=>{
        this.accountNum=data.accountNum;
        localStorage.setItem('accountNumber', this.accountNum);
        console.log("accountNumber= "+this.accountNum);
      }    )
    if (this.loggedInUser) {
      this.firstName = this.loggedInUser.firstName;
      this.lastName = this.loggedInUser.lastName;
      console.log("******",this.firstName , this.lastName);
    }
      this.authService.getUserById(this.userId).subscribe(
        (user: User) => {
          this.user = user;
          localStorage.setItem('userInfo', JSON.stringify(this.user));
          console.log('User details:', this.user);
        },
        (error) => {
          console.error('Error fetching user details', error);
        }
      );

  }

}
