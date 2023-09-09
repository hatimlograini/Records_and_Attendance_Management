import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) { }

  toggleLogin(state:boolean):void{
    this.isLoggedIn.next(state);
  }
  status() {
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
       console.log('User not lgged in !!');
    } else {
      const userObj:any = JSON.parse(localData);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
      } else {
        this.isLoggedIn.next(false);
         console.log('Token Expires!!');
      }
    }
    return this.isLoggedIn.asObservable();
  }

  login(email:string,password:string){
    return this.http.post('http://127.0.0.1:8000/api/login',{
      email:email,
      password:password
    });
  }
  //user Info
  user() {
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://localhost:8000/api/user', {
      headers: headers,
    });
  }

  logout(allDevice: boolean){
    const user: any = localStorage.getItem('user');
    const userObj = JSON.parse(user);

    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post('http://localhost:8000/api/logout', {allDevice:allDevice}, {headers:headers});
  }

  // Register
  register(name:string, email:string, password:string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
    }
    return this.http.post('http://localhost:8000/api/register', data);
  }

}
