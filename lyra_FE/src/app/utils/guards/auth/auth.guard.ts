import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router){}
 
   canActivate() {
 
     if(!this.tokenStorageService.isLoggedIn()) {
       this.router.navigate(['/login']);
       return false;
     }
     return true;
 
   }
   
 }
 