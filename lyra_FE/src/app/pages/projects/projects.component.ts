import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Project } from '../../model/Project';
import { User } from '../../model/User';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { UserService } from '../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [SidebarModule,Toolbar,ButtonModule,TableModule, FormsModule,RouterOutlet],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  
  visibleSidebar1=false;

  colsProjects!: any[];
  projects!: Project[];

  selectedProject!: Project;
  user:User;

  isAdmin=false;
  isManager=false;



  constructor(private projectService: ProjectService, private router:Router,
     private tokenStorageService: TokenStorageService, private userService: UserService, private route: ActivatedRoute) {
    this.user=this.tokenStorageService.getUser();
   }

  ngOnInit(): void {
    this.typeUser();
    this.getAllProjects();

    this.colsProjects = [
      { field: 'code', header: 'Codice' },
      { field: 'name', header: 'Nome' },
      { field: 'supervisor', header: 'Responsabile' },
      { field: 'token', header: 'Token' },
      { field: 'totalReports', header: 'Bugs totali' },
      { field: 'openReports', header: 'Bugs aperti' }
  ];
  }

  public getAllProjects():void{
    this.projectService.getProjects().subscribe(
      (response: Project[]) =>{
        this.projects=response;
      },
      (error:HttpErrorResponse) =>{
        console.error(error.message);
        
      }
    )
  }


  public reset(addForm: NgForm): void {
    addForm.resetForm();
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
  
  public onAddProject(addProjectForm: NgForm):void {
    console.log(addProjectForm.value);
    this.closeModal();
    this.projectService.addProject(addProjectForm.value).subscribe(
      (response: Project) => {
        console.log(response)
        this.openModalConfirm();
      },
      (error:HttpErrorResponse) => {
        this.OpenModalError();
      }
    );

    this.reset(addProjectForm);
  }

  openAllReportsFunction() {
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
  }
  
  signOut(){
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  selected(){
    this.projectService.setSelectedProject(this.selectedProject);
    this.router.navigateByUrl("/project/{{selectedProject.code}}");
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

  refresh(){
    window.location.reload();
  }

}
