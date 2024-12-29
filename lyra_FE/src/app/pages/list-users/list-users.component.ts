import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { User } from '../../model/User';
import { Project } from '../../model/Project';
import { Categories } from '../../model/Categories';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';


@Component({
  selector: 'app-list-users',
  imports: [SidebarModule,Toolbar,ButtonModule,TableModule,DropdownModule,FormsModule,RouterOutlet],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  visibleSidebar1=false;

  users!:User[];
  colsUsers!: any[];

  projects!: Project[];

  selectedProject1!: Project[];
  
  selectedUser!:User;


  isAdmin=false;
  isManager=false;

  selectedCategory!: Categories;
  categories!: Categories[];

  constructor(private tokenStorageService:TokenStorageService, private userService:UserService,
    private router: Router, private projectService: ProjectService, private route: ActivatedRoute) {


     }

  ngOnInit(): void {
    this.getUsers();
    this.typeUser();
    //this.getAllProjects();

    this.colsUsers = [
      { field: 'id', header: '#' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'registrationDate', header: 'Data registrazione' }
  ];

  this.categories = [
    { category: "Admin" },
    { category: "Ticket Manager" }
  ]
  }

  public getAllProjects(): void {
    this.projectService.getProjects().subscribe(
      (response: Project[]) => {
        this.projects = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  public getUsers():void{
    this.userService.getUsers().subscribe(
      (response: User[]) =>{
        this.users=response;
        console.log(response)
      },
      (error:HttpErrorResponse) =>{
        console.error(error.message);
      }
    )
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

  public onAddUser(addUserForm: NgForm){
    this.closeModal();
    addUserForm.value.role=[this.selectedCategory];
    console.log(addUserForm.value);
    this.userService.addUser(addUserForm.value).subscribe(
    (response: User) => {
      console.log(response)
      this.openModalConfirm();
    },
    (error: HttpErrorResponse) => {
      this.OpenModalError()
    }
  );
      
  }

  public reset(addForm: NgForm): void {
    addForm.resetForm();
  }

  openAllReportsFunction() {
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
  }

  closeModal(){
    document.getElementById('btn-confirm')!.setAttribute('data-bs-dismiss','modal');
    document.getElementById('btn-confirm')!.click();
    document.getElementById('btn-confirm')!.removeAttribute('data-bs-dismiss');
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

  selected(){
    this.userService.setSelectedUser(this.selectedUser);
    this.router.navigateByUrl("/user/{{selectedUser.id}}");
  }

  signOut(){
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  refresh(){
    window.location.reload();
  }
  

}
