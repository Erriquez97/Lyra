import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { User } from '../../model/User';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-update-profile',
  imports: [SidebarModule,Toolbar, ButtonModule, FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent {

  visibleSidebar1=false;
  
  user:User;
  updatedUser!: User;

  updateForm!: FormGroup;

  isAdmin=false;
  isManager=false;


  constructor(private userService:UserService, private router: Router, private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute) { 
    this.user= this.userService.getSelectedUser();
  }

  ngOnInit(): void {
    this.typeUser();
  }

  openModalConfirm(){
    document.getElementById('openModalButton')!.setAttribute('data-bs-target','#confirmModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle', 'modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  OpenModalError(){
    document.getElementById('openModalButton')!.setAttribute('data-bs-target','#errorModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle', 'modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  updateUser(updatedUser: User): void{
    console.log(updatedUser);
    updatedUser.id=this.user.id;
    this.userService.updateUser(updatedUser.id , updatedUser).subscribe(
      (response:User)=> {
        console.log(response);
        this.openModalConfirm();
      },
      (error: HttpErrorResponse) =>{
        this.OpenModalError();
      }
      );
  }

  refresh(){
    window.location.reload();
  }

  public typeUser(){
    if(this.tokenStorageService.getUser().roles=='ROLE_ADMIN'){
      console.log("Admin")
      this.isManager=false;
      this.isAdmin=true;
    }
    if(this.tokenStorageService.getUser().roles=='ROLE_TICKET_MANAGER'){
      console.log("manager")
      this.isAdmin=false;
      this.isManager=true;
    }
  }

  openAllReportsFunction() {
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
  }


  openProfile(){
    this.userService.setSelectedUser(this.user);
    this.router.navigateByUrl("/user/{{user.id}}");
  }

  openDashboard(){
    if(this.isAdmin){
      this.router.navigateByUrl("/dashboard");
    }
    else if(this.isManager){
      this.router.navigateByUrl("/dashTicketManager");
    }
  }
  
  signOut(){
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }
  


}
