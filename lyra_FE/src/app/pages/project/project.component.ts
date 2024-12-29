import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Report } from '../../model/Report';
import { Project } from '../../model/Project';
import { User } from '../../model/User';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { ReportService } from '../../services/report/report.service';
import { ProjectService } from '../../services/project/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project',
  imports: [SidebarModule,Toolbar,ButtonModule,TableModule,RouterOutlet],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {

  
  visibleSidebar1=false;

  reports!: Report[];
  colsReports!: any[];
  selectedReport!: Report;

  project!: Project;

  
  isAdmin=false;
  isManager=false;

  user:User;

  constructor(private router: Router, private userService: UserService, private tokenStorageService: TokenStorageService,
     private reportService: ReportService, private projectService: ProjectService, private route: ActivatedRoute) {

    this.project = this.projectService.getSelectedProject();
    this.user=this.tokenStorageService.getUser();
  }

  ngOnInit(): void {

    this.getReports();
    this.typeUser();

    this.colsReports = [
      { field: 'id', header: 'Codice' },
      { field: 'project', header: 'Progetto' },
      { field: 'registrationDate', header: 'Data apertura' },
      { field: 'closingDate', header: 'Data chiusura' }
    ];

  }

  /* da fare la get solo sul progetto selezionato*/
  public getReports(): void {
    this.reportService.getReportsByProject(this.project.name).subscribe(
      (response: Report[]) => {
        this.reports = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  public deleteProject(projectId: number): void {
    console.log(this.project.id)
    this.projectService.deleteProject(projectId).subscribe(
      (response: void) => {
        console.log(response);
        this.deleteAllReportsByProject(this.project.name)
        this.openModalConfirm();
      },
      (error: HttpErrorResponse) => {
        this.OpenModalError();
      }
    )
  }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public typeUser(){
    if(this.tokenStorageService.getUser().roles=='ROLE_ADMIN'){
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

  deleteAllReportsByProject(project:string){
    this.reportService.deleteAllReportsByProject(project).subscribe(
      (response: void) => {
        console.log(response);
        this.openModalConfirm();
      },
      (error: HttpErrorResponse) => {
        this.OpenModalError();
      }
    )
  }

  selected() {
    this.reportService.setSelectedReport(this.selectedReport);
    this.router.navigateByUrl("/report/{{selectedUser.id}}");
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
  closeModal() {
    document.getElementById('btn-confirm')!.setAttribute('data-bs-dismiss', 'modal');
    document.getElementById('btn-confirm')!.click();
    document.getElementById('btn-confirm')!.removeAttribute('data-bs-dismiss');
  }

  refresh(){
    window.location.reload();
  }

  openAllReportsFunction() {
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
  }


}
