import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css'
})
export class AdminHeaderComponent {
  url: string = '/';
  userName: string = localStorage.getItem('uname') || '';
  constructor(
    private route: Router,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.route.events.pipe(
      filter(event => event instanceof NavigationStart)

    ).subscribe((event: any) => {
      this.url = event?.url;
    });
  }
  gotourl(url: string): void {
    if (url === 'logout') {
      this.authService.clientLogout();
      return;
    }
    this.route.navigate(["/"+url]);
  }

}
