import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vault link Bank';

  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((event: any) => {
      const role = localStorage.getItem("role");
      if (role !== null && role === 'user') {
        setTimeout(() => {
          this.isLoggedIn = true;
          this.isAdminLoggedIn = false;
        }, 100);
      } else {
        if (role !== null && role === 'admin') {
          setTimeout(() => {
            this.isAdminLoggedIn = true;
            this.isLoggedIn = false;
          }, 100);
        } {
          setTimeout(() => {
            this.isLoggedIn = false;
            this.isAdminLoggedIn = false;
          }, 1);
        }
      }
    });
  }

}
