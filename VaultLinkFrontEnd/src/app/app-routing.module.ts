import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './Components/app-home/app-home.component';
import { LoginComponent } from './Components/login/login.component';
import { UserProfileComponent } from './Components/client/user-profile/user-profile.component';
import { ClienthomeComponent } from './Components/client/clienthome/clienthome.component';
import { ClientbalanceComponent } from './Components/client/clientbalance/clientbalance.component';
import { ClientdepositeComponent } from './Components/client/clientdeposite/clientdeposite.component';
import { TransferamountComponent } from './Components/client/transferamount/transferamount.component';
import { TransactionhistoryComponent } from './Components/client/transactionhistory/transactionhistory.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './Components/contact/contact.component';
import { RegisterComponent } from './Components/register/register.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ClientLoginGaurdService } from './gaurd/client-login-gaurd.service';
import { AdminLoginGaurdService } from './gaurd/admin-login-gaurd.service';

const routes: Routes = [
  {
    path: '',
    component: AppHomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [ClientLoginGaurdService]
  },
  {
    path: 'clienthome',
    component: ClienthomeComponent,
    canActivate: [ClientLoginGaurdService]
  },
  {
    path: 'clientbalance',
    component: ClientbalanceComponent,
    canActivate: [ClientLoginGaurdService]
  },
  {
    path: 'clientdeposite',
    component: ClientdepositeComponent,
    canActivate: [ClientLoginGaurdService]
  },
  {
    path: 'clienttransferamount',
    component: TransferamountComponent,
    canActivate: [ClientLoginGaurdService]
  },
  {
    path: 'clienthistory',
    component: TransactionhistoryComponent,
    canActivate: [ClientLoginGaurdService]
  },
  {
    path: 'adminDashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminLoginGaurdService]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'aboutus',
    component: AboutUsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
