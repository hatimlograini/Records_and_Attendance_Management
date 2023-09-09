import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private auth:AuthenticationService, private router:Router){}
  checkbox: boolean = true;
  logout(){

    this.auth.logout(this.checkbox).subscribe((res)=>{
      console.log(res);
      localStorage.removeItem('user');

      this.auth.toggleLogin(false);

      this.router.navigate(['/']);
    }, (err) =>{
      console.log(err)
    })
  }
}
