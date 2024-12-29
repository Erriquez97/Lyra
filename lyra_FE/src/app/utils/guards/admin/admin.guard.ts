import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router){}

  canActivate() {

    if(this.tokenStorageService.getUser().roles=='ROLE_TICKET_MANAGER') {
      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
  
}
