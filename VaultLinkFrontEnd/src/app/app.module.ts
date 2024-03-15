import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { AccountInformationComponent } from './Components/account-information/account-information.component';
import { AppHomeComponent } from './Components/app-home/app-home.component';
import { ContactComponent } from './Components/contact/contact.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { ClientbalanceComponent } from './Components/client/clientbalance/clientbalance.component';
import { ClientdepositeComponent } from './Components/client/clientdeposite/clientdeposite.component';
import { ClienthomeComponent } from './Components/client/clienthome/clienthome.component';
import { ClientprofileComponent } from './Components/client/clientprofile/clientprofile.component';
import { TransactionhistoryComponent } from './Components/client/transactionhistory/transactionhistory.component';
import { TransferamountComponent } from './Components/client/transferamount/transferamount.component';
import { UserProfileComponent } from './Components/client/user-profile/user-profile.component';
import { ClientheaderComponent } from './Components/client/clientheader/clientheader.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AppHeaderComponent } from './Components/app-header/app-header.component';
import { AdminHeaderComponent } from './Components/admin-header/admin-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientLoginGaurdService } from './gaurd/client-login-gaurd.service';
import { AdminLoginGaurdService } from './gaurd/admin-login-gaurd.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AccountInformationComponent,
    UpdateProfileComponent,
    UserProfileComponent,
    AboutUsComponent,
    AdminHeaderComponent,
    AdminDashboardComponent,
    AppHomeComponent,
    ClienthomeComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ClientbalanceComponent,
    ClientdepositeComponent,
    AppHeaderComponent,
    ClienthomeComponent,
    ClientprofileComponent,
    TransactionhistoryComponent,
    TransferamountComponent,
    ClientheaderComponent,
    AppHeaderComponent,
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule
    
  ],
  providers: [
    ClientLoginGaurdService,
    AdminLoginGaurdService,
    AuthService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
