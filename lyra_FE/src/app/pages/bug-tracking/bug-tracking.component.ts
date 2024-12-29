import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, NgForm} from '@angular/forms';
import { Project } from '../../model/Project';
import { User } from '../../model/User';
import { Categories } from '../../model/Categories';
import { ReportService } from '../../services/report/report.service';
import { ProjectService } from '../../services/project/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { UserService } from '../../services/user/user.service';
import { Report } from '../../model/Report';

@Component({
  selector: 'app-bug-tracking',
  imports: [SidebarModule,Toolbar,ButtonModule,DropdownModule,TableModule,FormsModule],
  templateUrl: './bug-tracking.component.html',
  styleUrl: './bug-tracking.component.scss'
})
export class BugTrackingComponent {

  visibleSidebar1=false;
  tokenStatus!: String;
  addForm!: FormGroup;
  file!:any;

  projects!: Project[];

  selectedProject1!: Project;

  reports!: Report[];
  colsReports!: any[];
  selectedReport!: Report;

  addReportForm!: FormGroup;

  isAdmin=false;
  isManager=false;

  selectedStatus!:String;
  categories!: Categories[];

  user!:User;

  selectedCategory!: Categories;
  categoriesReport!: Categories[];


  constructor(private reportService: ReportService, private projectService: ProjectService,
     private router: Router, private tokenStorageService: TokenStorageService,
      private userService: UserService, private route: ActivatedRoute,private formBuilder: FormBuilder) {
      this.user=this.tokenStorageService.getUser();
      this.route.queryParams.subscribe(params =>{
      this.tokenStatus=params['status']
    })

    if(this.tokenStatus=="aperto"){
      this.getReportsByStatus("Aperto");
    }
    if(this.tokenStatus=="chiuso"){
      this.getReportsByStatus("Chiuso")
    }
    if(this.tokenStatus=="tutti"){
      this.getReports();
    }
  
    this.categories = [
      { category: "Aperti" },
      { category: "Chiusi" },
      { category: "Tutti" }
    ]

    this.categoriesReport = [
      { category: "Richiesta Commerciale" },
      { category: "Assistenza tecnica" },
      { category: "Maggiori informazioni" },
      { category: "Altro" }
    ]
    
  
   }

  ngOnInit(): void {
   
    this.addForm = this.formBuilder.group({
      profile: ['']
    });
 
    this.typeUser();
    this.getAllProjects();
    //this.getReports();
   
    this.colsReports = [
      { field: 'id', header: 'Codice' },
      { field: 'project', header: 'Progetto' },
      { field: 'registrationDate', header: 'Data apertura' },
      { field: 'closingDate', header: 'Data chiusura' },
      { field: 'status', header: 'Status' },
    ];
  }

  onFileSelect(event:any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.addForm.get('profile')!.setValue(this.file);
    }
  }

  public getReports(): void {
    this.reportService.getReports().subscribe(
      (response: Report[]) => {
        this.reports = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  public getReportsByStatus(string:String):void{
   this.reportService.getReportsByStatus(string).subscribe(
  (response: Report[]) => {
    this.reports = response;
  },
  (error: HttpErrorResponse) => {
    console.error(error.message);
  }
  )
}

cliccato(){
  if(this.selectedStatus=="Aperti"){
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'aperto'
      }
    });
   this.getReportsByStatus("Aperto")
  }
  if(this.selectedStatus=="Chiusi"){
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'chiuso'
      }
    });
    this.getReportsByStatus("Chiuso")
  }
  if(this.selectedStatus=="Tutti"){
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
    this.getReports();
  }
  /*if(this.selectedStatus=="Tutti"){
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
    
  }*/
}

  /*public getAllMyReports(): void {
    this.reportService.getReports().subscribe(// da implementare getReportsByProjects
      (response: Report[]) => {
        this.reports = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }*/

  /*public getReportsByProject(project: Project): void {
    this.reportService.getReportsByProject(project.name).subscribe(
      (response: Report[]) => {
        this.reports = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }*/


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

  public onAddReport(addReportForm: NgForm): void {
    this.closeModal();
    this.reportService.addReport(addReportForm.value).subscribe(
      (response: Report) => {
        this.openModalConfirm();
        console.log(response)

        const formData = new FormData();
        formData.append('file', this.addForm.get('profile')!.value);
        this.reportService.addImage(formData, response.id).subscribe(
          (response: any) => {
            this.addForm.get('profile')!.setValue(null);
          },
          (error:HttpErrorResponse) => {
            console.log(error);
            this.addForm.get('profile')!.setValue(null);
          }
        );
      },
      (error: HttpErrorResponse) => {
        this.OpenModalError();
      }
    );
    addReportForm.resetForm();
    this.file=null   
  }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
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

  selected() {
    this.reportService.setSelectedReport(this.selectedReport);
    this.router.navigateByUrl("/report/{{selectedUser.id}}");
  }

  prova(){
    console.log(this.selectedProject1);
    this.projectService.setSelectedProject(this.selectedProject1);
    //this.getReportsByProject(this.selectedProject1.name);

  }

  refresh(){
    window.location.reload();
  }

}
