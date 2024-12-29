import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { User } from '../../model/User';
import { Project } from '../../model/Project';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [ButtonModule,SidebarModule,Toolbar,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  
  visibleSidebar1=false;
  user: User;

  form: any = {
    oldPassword: null,
    newPassword: null,
    confirmPassword: null
  };

  isPasswordDifferent = false;

  messageConfirm!: string;
  messageError!: string;

  canEditProfile = false;

  isAdmin = false;
  isManager = false;

  actualProjects!: Project[];


  constructor(private userService: UserService, private router: Router, private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute) {

    this.user = this.userService.getSelectedUser();

  }

  ngOnInit(): void {
    this.canUserEditProfile();
    this.typeUser();


  }

  closeModalChange() {
    document.getElementById('btn-confirmChange')!.setAttribute('data-bs-dismiss','modal');
    document.getElementById('btn-confirmChange')!.click();
    document.getElementById('btn-confirmChange')!.removeAttribute('data-bs-dismiss');
  }
  closeModalReset() {
    document.getElementById('btn-confirmReset')!.setAttribute('data-bs-dismiss','modal');
    document.getElementById('btn-confirmReset')!.click();
    document.getElementById('btn-confirmReset')!.removeAttribute('data-bs-dismiss');
  }

  openModalConfirm() {
    document.getElementById('openModalButton')!.setAttribute('data-bs-target', '#confirmModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle', 'modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  OpenModalError() {
    document.getElementById('openModalButton')!.setAttribute('data-bs-target', '#errorModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle', 'modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }
  private handleError(err: HttpErrorResponse) {
    if (err.status == 400) {
      this.messageError = "Errore, vecchia password sbagliata"
    }
    else {
      this.messageError = "Errore, password non cambiata, riprova più tardi"
    }
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(
      (response: void) => {
        console.log(response);
        this.messageConfirm = "Utente eliminato con successo";
        this.openModalConfirm();
      },
      (error: HttpErrorResponse) => {
        this.messageError = "Errore, utente non eliminato, riprova più tardi";
       // this.closeModal();
        alert(error.message);
      }
    )
    if(this.isManager){
      console.log("Manager")
      this.signOut();
    }
  }

  public reset(addForm: NgForm): void {
    addForm.resetForm();
  }

  public onChangePassword(addForm: NgForm): void {
    const { oldPassword, newPassword, confirmPassword } = this.form;
    console.log(this.form)
    if (newPassword === confirmPassword) {
      this.closeModalChange();
      this.userService.changePassword(this.user.id, oldPassword, newPassword).subscribe(
        (response: any) => {
          console.log(response)
          this.messageConfirm = "Password cambiata con successo";
          this.openModalConfirm();
        },
        (error: HttpErrorResponse) => {
          this.handleError(error);
          this.OpenModalError();
        }
      );
      this.reset(addForm);
      this.isPasswordDifferent = false;
    } else {
      this.isPasswordDifferent = true;
    }
  }

  public onResetPassword(addForm: NgForm) {
    const { newPassword, confirmPassword } = this.form;
    if (newPassword === confirmPassword) {
      this.closeModalReset();
      this.userService.resetPassword(this.user.id, newPassword).subscribe(
        (response: any) => {
          console.log(response)
          this.messageConfirm = "Password cambiata con successo";
          this.openModalConfirm();
        },
        (error: HttpErrorResponse) => {
          this.messageError = "Errore, password non cambiata"
          this.OpenModalError();
        }
      );
      this.reset(addForm);
      this.isPasswordDifferent = false;
    } else {
      this.isPasswordDifferent = true;
    }
}


 public modifyProfile(){
  this.router.navigate(['/user/updateProfile/{{user.id}}']);
}

  public canUserEditProfile(){
  if (this.tokenStorageService.getUser().id === this.user.id) {
    this.canEditProfile = true;
  }
  else {
    this.canEditProfile = false;
  }
}

signOut(){
  window.sessionStorage.clear();
  this.router.navigate(['/login']);
}

openAllReportsFunction() {
  this.router.navigate(['/bugTracking'], {
    relativeTo: this.route,
    queryParams: {
      status: 'tutti'
    }
  });
}

  public typeUser(){
  if (this.tokenStorageService.getUser().roles == 'ROLE_ADMIN') {
    console.log("Admin")
    this.isManager = false;
    this.isAdmin = true;
  }
  if (this.tokenStorageService.getUser().roles == 'ROLE_TICKET_MANAGER') {
    console.log("manager")
    this.isAdmin = false;
    this.isManager = true;
  }
}

openProfile(){
  this.userService.setSelectedUser(this.user);
  this.router.navigateByUrl("/user/{{user.id}}");
}

openDashboard(){
  if (this.isAdmin) {
    this.router.navigateByUrl("/dashboard");
  }
  else if (this.isManager) {
    this.router.navigateByUrl("/dashTicketManager");
  }
}

refresh(){
  window.location.reload();
}


}
