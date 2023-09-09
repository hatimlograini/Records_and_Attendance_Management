import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ExitToApp } from '@material-ui/icons';
import { LoginComponent } from './components/authentification/login/login.component';
import { RegisterComponent } from './components/authentification/register/register.component';
import { Dasheboard2Component } from './components/dasheboard2/dasheboard2.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/authentification/logout/logout.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewRelevesComponent } from './components/view-releves/view-releves.component';
import { AddRelevesComponent } from './components/add-releves/add-releves.component';
import { UpdateReleveseComponent } from './components/update-relevese/update-relevese.component';
import { ViewEmployeesComponent } from './components/view-employees/view-employees.component';
import { ViewPresentComponent } from './components/view-present/view-present.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SideBarComponent,
    LoginComponent,
    RegisterComponent,
    Dasheboard2Component,

    LogoutComponent,
    NavBarComponent,
    ViewRelevesComponent,
    AddRelevesComponent,
    UpdateReleveseComponent,
    ViewEmployeesComponent,
    ViewPresentComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
