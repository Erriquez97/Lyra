import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { User } from '../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../../services/report/report.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { UserService } from '../../services/user/user.service';
import { Report } from '../../model/Report';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [SidebarModule,Toolbar,TableModule,ButtonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  visibleSidebar1=false;
  report: Report;
  form: any = {
    toEmail: null,
    subject: null,
    body:null
  };

  messageConfirm!: string;
  messageError!: string;
  isClosed=false;
  isOpen=true;

    
  isAdmin=false;
  isManager=false;

  user:User;


  constructor(private router: Router, private reportService: ReportService,
     private tokenStorageService: TokenStorageService, private userService: UserService, private route: ActivatedRoute) { 
     this.report=this.reportService.getSelectedReport();
     this.user=this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.typeUser();
    if(this.report.status=="Chiuso"){
      this.isClosed=true;
      this.isOpen=false;
    }
  }

  public onCustomizedEmail(addReportForm: NgForm): void {
    const { toEmail, subject, body } = this.form;
    this.closeModal();
    this.reportService.sendCustomizedEmail(this.report.email, subject, body).subscribe(
      (response: any) => {
        this.reportService.closeReport(this.report.id).subscribe(
          (response:void)=> {
            console.log(response);
            this.messageConfirm="Ticket chiuso con successo e email inviata";
            this.openModalConfirm();
          },
          (error: HttpErrorResponse) =>{
            console.error(error);
            this.messageError="Email inviata con successo ma ticket non chiuso";
            this.openModalError();
          }
        );
        console.log(response)
      },
      (error: HttpErrorResponse) => {
        this.messageError="Errore, email non inviata e ticket non chiuso";
        this.openModalError();
      }
    );
    this.reset(addReportForm);
  }

  public sendAutoEmail(): void{    
    this.reportService.sendEmail(this.report.email).subscribe(
      (response:any)=> {
        this.reportService.closeReport(this.report.id).subscribe(
          (response:void)=> {
            console.log(response);
            this.messageConfirm="Ticket chiuso con successo e email inviata";
            this.openModalConfirm();
          },
          (error: HttpErrorResponse) =>{
            console.error(error);
            this.messageError="Email inviata con successo ma ticket non chiuso";
            this.openModalError();
          }
        );
        console.log(response);
      },
      (error: HttpErrorResponse) =>{
        this.messageError="Errore, email non inviata e ticket non chiuso, riprova più tardi";
        this.openModalError();
      }
    );
  }

  public closeTicket(): void{
    this.reportService.closeReport(this.report.id).subscribe(
      (response:void)=> {
        console.log(response);
        this.messageConfirm="Ticket chiuso con successo";
        this.openModalConfirm();
      },
      (error: HttpErrorResponse) =>{
        this.messageError="Errore, ticket non chiuso, riprova più tardi";
        console.error(error)
        this.openModalError();
      }
    );
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
  
  eliminaTicket(){
    this.reportService.deleteReport(this.report.id).subscribe(
      (response:void)=> {
        console.log(response);
        this.messageConfirm="Ticket eliminato con successo";
        this.openModalConfirm();
      },
      (error: HttpErrorResponse) =>{
        this.messageError="Errore, ticket non eliminato, riprova più tardi";
        console.error(error)
        this.openModalError();
      }
    );
  }


  buttonDisabled(){
    if(this.report.status=="Chiuso"){
    document.getElementById('button-close-report')!.setAttribute('disabled','true');
    }
  }

  openModalConfirm(){
    document.getElementById('openModalButton')!.setAttribute('data-bs-dismiss','modal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-target','#confirmModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle','modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-dismiss');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  openModalError(){
    document.getElementById('openModalButton')!.setAttribute('data-bs-dismiss','modal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-target','#errorModal');
    document.getElementById('openModalButton')!.setAttribute('data-bs-toggle','modal');
    document.getElementById('openModalButton')!.click();
    document.getElementById('openModalButton')!.removeAttribute('data-bs-dismiss');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-target');
    document.getElementById('openModalButton')!.removeAttribute('data-bs-toggle');
  }

  closeModal(){
    document.getElementById('btn-sendCustomizedEmail')!.setAttribute('data-bs-dismiss','modal');
    document.getElementById('btn-sendCustomizedEmail')!.click();
    document.getElementById('btn-sendCustomizedEmail')!.removeAttribute('data-bs-dismiss');
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

  public reset(addForm: NgForm): void {
    addForm.resetForm();
  }

  refresh(){
    window.location.reload();
  }

}
