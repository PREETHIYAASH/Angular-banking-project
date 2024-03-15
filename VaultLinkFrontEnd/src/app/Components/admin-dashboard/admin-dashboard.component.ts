import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { AccountService } from '../../account.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';
import { User } from '../../user';
import { take } from 'rxjs';
import { AccountInformationComponent } from '../account-information/account-information.component';
// import { error } from 'console';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  unreadMessagesCount: number = 0;
  
  users: User[] = [];
  
  searchText: string = '';
  

  constructor(private router: Router, private authService: AuthService,
    private dialog: MatDialog,
    private accountService: AccountService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  ngOnDestroy() {
    
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      (users: User[]) => {
        if (users.length > 0) {
          const adminId = localStorage.getItem('uId');
          if (adminId !== null) {
            // Logged in Admin user,  Never come in to list of User list.
            this.users = users.filter((item: any) => item?.id !== parseInt(adminId, 10));
          }
        } else {
          this.users = [];
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: number) {
    this.authService.deleteUserById(userId).subscribe(
      () => {
        this.getAllUsers();
        window.alert('Account deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  searchUsers(searchText: string) {
   
    this.authService.searchUsers(searchText).subscribe(
      (data: User[]) => {
        if (data.length > 0) {
          const adminId = localStorage.getItem('uId');
          if (adminId !== null) {
            this.users = data.filter((item: any) => item?.id !== parseInt(adminId, 10));
          }
        } else {
          this.users = [];
        }
      },
      (error: any) => {
        console.error('Error searching users', error);
      }
    );
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.searchUsers(value);
  }

  updateUser(userId: any): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: { id: userId },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

  activateUser(user: any): void {
    user.activateAccount = true;
    this.authService.activateAccount(user?.id, user).pipe(take(1)).subscribe((res: any) => {
      if (res && res.activateAccount === true) {
        alert("Account Activate successfully");
        this.getAllUsers();
      }
    }, err => {
      alert("Error occured while update user.");
    })
  }

  getAccountDetail(userId: any): void {
    this.accountService.getAccountByUserId(userId).pipe(take(1)).subscribe((res: any) => {
      const dialogRef = this.dialog.open(AccountInformationComponent, {
        data: res,
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '80%',
        width: '80%'
      });
    });
  }

}
