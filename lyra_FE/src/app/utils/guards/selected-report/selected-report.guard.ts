import { CanActivate, Router } from '@angular/router';
import { ReportService } from '../../../services/report/report.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SelectedReportGuard implements CanActivate {

  constructor(private router: Router, private reportService: ReportService){ }
  
  canActivate() {

    if (!this.reportService.getSelectedReport()) {
      this.router.navigate(['/bugTracking']);
      return false;
    }
    return true;

  }
}
