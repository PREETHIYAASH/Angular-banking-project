import { Component } from '@angular/core';
import { User } from '../../../user';
import { AccountService } from '../../../account.service';
import { AuthService } from '../../../auth.service';
import { UpdateProfileComponent } from '../../update-profile/update-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  accountNumber: string = '';
  user: User = new User(0,"","","","","","","","", "","", false, "");
  constructor(
    private accountService: AccountService ,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.accountNumber = localStorage.getItem('accountNumber') || '';
    const usr = localStorage.getItem('userInfo');
    if (usr !== null) {
      this.user = JSON.parse(usr);
    }
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: {id: localStorage.getItem('uId')},
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      const usr = localStorage.getItem('userInfo');
      if (usr !== null) {
        this.user = JSON.parse(usr);
      }
    });
  }

}
