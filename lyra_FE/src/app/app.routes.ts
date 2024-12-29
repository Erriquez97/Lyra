import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardTicketManagerComponent } from './pages/dashboard-ticket-manager/dashboard-ticket-manager.component';
import { BugTrackingComponent } from './pages/bug-tracking/bug-tracking.component';
import { FormComponent } from './pages/form/form.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './utils/guards/auth/auth.guard';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';
import { SelectedProjectGuard } from './utils/guards/selected-project/selected-project.guard';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectComponent } from './pages/project/project.component';
import { ReportComponent } from './pages/report/report.component';
import { AdminGuard } from './utils/guards/admin/admin.guard';
import { SelectedUserGuard } from './utils/guards/selected-user/selected-user.guard';
import { SelectedReportGuard } from './utils/guards/selected-report/selected-report.guard';

export const routes: Routes = [
   { path: '', component: LoginComponent},
   {path: 'dashboard', component: DashboardComponent , canActivate: [AdminGuard,AuthGuard]},
   { path: 'dashTicketManager', component: DashboardTicketManagerComponent , canActivate: [AuthGuard] },
   { path: 'bugTracking', component: BugTrackingComponent, canActivate: [AuthGuard]},
   { path: 'form', component: FormComponent },
   { path: 'user/:id', component: UsersComponent, canActivate: [SelectedUserGuard, AuthGuard] },
    { path: 'user/updateProfile/:id', component: UpdateProfileComponent, canActivate: [SelectedUserGuard, AuthGuard]},
    { path: 'users', component: ListUsersComponent, canActivate: [AdminGuard, AuthGuard]},
    { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
    { path: 'project/:id', component:ProjectComponent, canActivate:[SelectedProjectGuard, AuthGuard]},
    { path: 'bugTracking', component: BugTrackingComponent, canActivate: [AuthGuard]},
    { path: 'report/:id', component: ReportComponent, canActivate:[SelectedReportGuard, AuthGuard]},
    { path: '**', component:LoginComponent}



];
