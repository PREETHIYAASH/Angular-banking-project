import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class ClientLoginGaurdService implements CanActivate {
  constructor(public router: Router) {
  }

  canActivate(): boolean {
      if (!this.isAuthenticated()) {
          this.router.navigate(['/adminlogin']);
          return false;
      } else {
          return true;
      }
  }

  isAuthenticated() {
      return (localStorage.getItem('role') === 'user');
  }
}
