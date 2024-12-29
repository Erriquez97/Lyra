import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root', // This allows the guard to be provided globally.
})
export class SelectedUserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router, private tokenStorageService: TokenStorageService) { }

  canActivate() {

    if (!this.userService.getSelectedUser()) {
      if (this.tokenStorageService.getUser().roles == 'ROLE_ADMIN' || this.tokenStorageService.getUser().roles=='ROLE_SUPERADMIN') {
          this.router.navigate(['/users']);
      }
      if (this.tokenStorageService.getUser().roles == 'ROLE_TICKET_MANAGER') {
          this.router.navigate(['/dashTicketManager']);
      }
      return false;
    }
    return true;

  }
}
