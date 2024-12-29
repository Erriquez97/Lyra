import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {ReactiveFormsModule, FormControl, FormGroup,Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,ButtonModule],
  providers: [HttpClient],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email,Validators.required]),
    password: new FormControl('',Validators.required)
  });

  isLoggedIn = false;
  isLoginFailed = false;
  roles= "";

  constructor(private authenticationService: AuthenticationService, private tokenStorage: TokenStorageService, private router: Router){}
  
  onSubmit(): void {
    const email = this.loginForm.get('email')?.value ?? '';
    const password = this.loginForm.get('password')?.value ?? '';

    this.authenticationService.login(email, password).subscribe(
      data => {
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        if(this.roles=='ROLE_ADMIN'||this.roles== 'ROLE_SUPERADMIN'){
          this.router.navigate(['/dashboard']);
        }
        if(this.roles=='ROLE_TICKET_MANAGER'){
          this.router.navigate(['/dashTicketManager'])
        }  
        const user =this.tokenStorage.getUser();
        console.log(user.email);      
      },
      err => {
        this.isLoginFailed = true;
      }
    );
  }


}
