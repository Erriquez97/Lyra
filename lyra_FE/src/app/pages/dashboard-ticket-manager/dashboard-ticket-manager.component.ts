import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { User } from '../../model/User';
import { UserService } from '../../services/user/user.service';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReportService } from '../../services/report/report.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-ticket-manager',
  imports: [SidebarModule, Toolbar, ButtonModule, ChartModule],
  templateUrl: './dashboard-ticket-manager.component.html',
  styleUrl: './dashboard-ticket-manager.component.scss'
})
export class DashboardTicketManagerComponent {
  
  visibleSidebar1=false;
  data: any;

  basicData: any;
  last7days: any;

  options: any;
  myDate = new Date();
  currentDate="";


  today = this.createDate(0, 0, 0);

  numberReportsYear=0;
  totalReports=0;
  months: string[];
  d= new Date;
  month: string[];

  user:User;

  constructor(private router: Router,private userService: UserService, private datePipe: DatePipe, private reportService: ReportService,
    private tokenStorageService: TokenStorageService,private route: ActivatedRoute) {
    this.currentDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy HH:mm:ss')!;
    this.months=["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"]
    this.month=[];

     for(var i = 11; i > -1; i -= 1) {
      this.d = new Date(this.today.getFullYear(), this.today.getMonth() - i, 1);
      this.month[i] = this.months[this.d.getMonth()];
    }

    this.options = {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true,
            stepValue: 0
          }
        }]
      }
    }

    this.user=this.tokenStorageService.getUser();
  }

  ngOnInit(): void {
    this.getNumberReportsLastYear();
    this.getNumberReportsByCategory();
    this.getTotalReports();
    this.getNumberReportsByMonth();
    console.log("entrato")
    console
  }


  createDate(days:any, months:any, years:any) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;
  }

  public getTotalReports(): void {
    this.reportService.getNumberReports().subscribe(
      (response: number) => {
        this.totalReports = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }


  public getNumberReportsLastYear(): void {
    this.reportService.getNumberReportsBetweenDates().subscribe(
      (response: number[]) => {
        this.last7days = {
          labels: ['Ultimi 7 giorni', 'Ultimo mese', 'Ultimo anno'],
          datasets: [
            {
              label: 'Tickets totali',
              backgroundColor: '#42A5F5',
              data: response
            }
          ]
        };
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  public getNumberReportsByCategory(): void {
    this.reportService.getNumberReportsByCategory("Richiesta commerciale", "Assistenza tecnica", "Maggiori informazioni", "Altro").subscribe(
      (response: number[]) => {
        console.log(response)
        this.data = {
          labels: ['Richiesta commerciale', 'Assistenza tecnica', 'Maggiori informazioni', 'Altro'],
          datasets: [
            {
              data: response,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#7E57C2"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#7E57C2"
              ]
            }]
        };
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }


  public getNumberReportsByMonth(): void {
    this.reportService.getNumberReportsByMonths().subscribe(
      (response: number[]) => {
       
        this.basicData = {
          labels: this.month.reverse(),
          datasets: [
            {
              label: 'Tickets',
              backgroundColor: '#42A5F5',
              data: response
            }
          ]
        };
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      }
    )
  }

  openAllReportsFunction() {
    this.router.navigate(['/bugTracking'], {
      relativeTo: this.route,
      queryParams: {
        status: 'tutti'
      }
    });
  }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  openProfile(){
    this.userService.setSelectedUser(this.user);
    this.router.navigateByUrl("/user/{{user.id}}");
  }




}
