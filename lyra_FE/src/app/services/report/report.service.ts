import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../../model/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiServerUrl= environment.apiBaseUrl;
  private apiServerBugs= environment.apiBaseReportsFake;
  private report!:Report;
  private API="http://localhost:8080/reports"


  constructor(private http: HttpClient) { }

  public addReport(report: Report): Observable<Report> {
    return this.http.post<Report>(`${this.apiServerUrl}/reports/add`,report);
  }

  public addImage(file:FormData, id: string): Observable <any>{
    return this.http.post<any>(`${this.apiServerUrl}/reports/addImage/${id}`,file);
  }
  
  public setPath(report:Report, id: string): Observable <any>{
    return this.http.post<any>(`${this.apiServerUrl}/reports/setPath/${id}`,report);

  }

  public closeReport(id: String): Observable<void>{
    return this.http.put<void>(`${this.apiServerUrl}/reports/close`,id);
  }

  public getReports(): Observable<Report[]>{
    return this.http.get<Report[]>(`${this.API}/order`);
  }

  public deleteReport(id: String) : Observable<void>{
    return this.http.delete<void>(`${this.API}/delete/${id}`);
  }

  public deleteAllReportsByProject(project: String) : Observable<void>{
    return this.http.delete<void>(`${this.API}/deleteAllReports/${project}`);
  }

  public getReportsByProject(project: String): Observable<Report[]>{
    return this.http.get<Report[]>(`${this.API}/all/${project}`);
  }

  public getReportsByStatus(status: String): Observable<Report[]>{
    return this.http.get<Report[]>(`${this.API}/status/${status}`);
  }


  public getNumberReports(): Observable<number>{
    return this.http.get<number>(`${this.API}/count`);
  }

  public getNumberReportsBetweenDates(): Observable<number[]>{
    return this.http.get<number[]>(`${this.API}/allDates`);
  }

  public getNumberReportsByMonths(): Observable<number[]>{
    return this.http.get<number[]>(`${this.API}/allDatesByMonth`);
  }

  public getNumberReportsByStatus(status:String): Observable<number>{
    return this.http.get<number>(`${this.API}/countByStatus/${status}`);
  }

  public getNumberReportsByCategory(category1:String,category2:String,category3:String,category4:String): Observable<number[]>{
    return this.http.get<number[]>(`${this.API}/countByCategories/${category1}/${category2}/${category3}/${category4}`);
  }

  public setSelectedReport(selectedReport: Report){
    this.report=selectedReport;
  }

  public getSelectedReport(): Report{
    return this.report;
  }

  public sendEmail(toEmail: string) :Observable<any>{
    return this.http.post<any>(`${this.API}/sendEmail`,toEmail);
  }

  public sendCustomizedEmail(toEmail: string, subject: string, body: string) :Observable<any>{
    return this.http.post<any>(`${this.API}/sendCustomizedEmail`,
    {
      toEmail,
      subject,
      body
    });

  }
  public isSelected() {
    return !!this.getSelectedReport();
  }



}
