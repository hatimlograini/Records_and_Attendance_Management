import { UpdateReleveseComponent } from './components/update-relevese/update-relevese.component';
import { Dasheboard2Component } from './components/dasheboard2/dasheboard2.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/authentification/login/login.component';
import { RegisterComponent } from './components/authentification/register/register.component';
import { AuthGuard } from './AuthGuard/auth.guard';
import { LogoutComponent } from './components/authentification/logout/logout.component';
import { AddRelevesComponent } from './components/add-releves/add-releves.component';
import { ViewRelevesComponent } from './components/view-releves/view-releves.component';
import { ViewEmployeesComponent } from './components/view-employees/view-employees.component';
import { ViewPresentComponent } from './components/view-present/view-present.component';



const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'view-releves'},
  {path:'dashboard',component:DashboardComponent , canActivate:[AuthGuard]},
  {path:'dash2',component:Dasheboard2Component , canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'logout',component:LogoutComponent ,canActivate:[AuthGuard]},
  {path:'view-releves',component:ViewRelevesComponent ,canActivate:[AuthGuard]},
  {path:'view-employes',component:ViewEmployeesComponent ,canActivate:[AuthGuard]},
  {path:'view-presences',component:ViewPresentComponent ,canActivate:[AuthGuard]},
  {path:'add-releve',component:AddRelevesComponent ,canActivate:[AuthGuard]},
  {path:'edit-releve/:id',component:UpdateReleveseComponent, canActivate:[AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
