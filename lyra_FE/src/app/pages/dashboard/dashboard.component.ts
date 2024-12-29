import { Component } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
@Component({
    selector: 'app-dashboard',
    imports: [SidebarModule, Toolbar,ButtonModule,ChartModule],
    standalone:true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  visibleSidebar1=false;

  totalReports=0;
  openReports=0;

  totalProjects=0;
  totalUsers=0;

  basicData: any;
  last7days: any;
  options: any;

  myDate = new Date();
  currentDate='';
//   today = this.createDate(0, 0, 0);
  numberReportsYear=0;

  months: string[] =[];
  d= new Date();
  month: string[]=[];


  openAllReportsFunction(){}

  openReportsFunction(){

  }

  signOut(){
    
  }
}
