import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Project } from '../../model/Project';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiServerProjects = environment.apiBaseProjectsFake;
  private apiAddProjects = environment.apiBaseADDprojects;
  private API="http://localhost:8080/projects"

  private project!: Project;

  constructor(private http: HttpClient) { }


  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiAddProjects}`, project);
  }

  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.API}/all`);
  }

  public getTotalReports(): Observable<Number>{
    return this.http.get<Number>(`${this.API}/totalReports`);
  }

  public getOpenReports(): Observable<Number>{
    return this.http.get<Number>(`${this.API}/openReports`);
  }

  public deleteProject(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/delete/${projectId}`);
  }

  public getTotalProjects(): Observable<Number>{
    return this.http.get<Number>(`${this.API}/totalProjects`);
  }

  public setSelectedProject(selectedProject: Project){
    this.project=selectedProject;
  }

  public getSelectedProject(): Project{
    return this.project;
  }
}
