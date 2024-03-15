import { Component } from '@angular/core';
import { User } from '../../../user';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-clientheader',
  templateUrl: './clientheader.component.html',
  styleUrl: './clientheader.component.css'
})
export class ClientheaderComponent {
  url: string = '/';
  user: User = new User(0,"","","","","","","","", "","", false, "");
  constructor(
    private route: Router,
    private authService: AuthService
  ) {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo !== null) {
      this.user = JSON.parse(userInfo);
    }
  }


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
    console.log('>>>>>>>>>>>>', url)
    this.route.navigate(["/"+url]);
  }
}
