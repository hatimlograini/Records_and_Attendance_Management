import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage!:string;

  constructor(private router:Router,private auth:AuthenticationService) {
  }

  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    //console.log(email,password);
    this.auth.login(email,password).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('user',JSON.stringify(res));

       this.router.navigate(['/view-releves'])

    },err=>{
      console.log(err);
      this.errorMessage = "invalid credentials"
    });
  }
}
