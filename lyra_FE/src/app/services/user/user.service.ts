import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { User } from '../../model/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUsers= environment.apiBaseUsers;
  private apiAddUser= environment.apiBaseUrl;
  private API= '/assets/users.json';
  private user!:User;
  private Url= 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUsers}/all`);

  }
  public updateUser(id: String, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUsers}/update/${id}`, user);
  }

  public setSelectedUser(selectedUser: User){
    this.user=selectedUser;
  }

  public getSelectedUser(): User{
    return this.user;

  }

  public deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUsers}/delete/${userId}`);
  }

  public changePassword(id:string, oldPassword: string, newPassword: string):Observable<any>{
    return this.http.put<any>(`${this.apiServerUsers}/changePassword/${id}`,{
      oldPassword,
      newPassword
    });
  }

  public resetPassword(id:string, newPassword: string):Observable<any>{
    return this.http.put<any>(`${this.apiServerUsers}/resetPassword/${id}`,newPassword);
  }

  public getTotalUsers(): Observable<Number>{
    return this.http.get<Number>(`${this.apiServerUsers}/totalUsers`);
  }

  public addUser(user:User): Observable<User>{
    return this.http.post<User>(`${this.apiAddUser}/auth/signup`,user);
  }

  
  public isSelected() {
    return !!this.getSelectedUser();
  }

}
