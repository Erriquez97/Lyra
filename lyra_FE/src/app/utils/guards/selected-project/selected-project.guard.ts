import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { ProjectService } from '../../../services/project/project.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectedProjectGuard implements CanActivate {

  constructor(private projectService: ProjectService, private router: Router) { }

  canActivate() {

    if (!this.projectService.getSelectedProject()) {
      this.router.navigate(['/projects']);
      return false;
    }
    return true;

  }

  
}
