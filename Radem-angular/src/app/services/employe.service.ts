  import { Injectable } from '@angular/core';
  import { Observable, map } from 'rxjs';
  import { HttpClient } from '@angular/common/http';
  import { Employe } from './class/employe';

  @Injectable({
    providedIn: 'root'
  })
  export class EmployeService {
    baseUrl: string = 'http://127.0.0.1:5000/api/users';
    todayUrl: string = 'http://127.0.0.1:5000/api/users/today';

    constructor(private httpClient: HttpClient) { }

    getEmployes(): Observable<Employe[]> {
      return this.httpClient.get<any>(this.baseUrl).pipe(
        map(data => {
          return Object.keys(data).map(key => ({ id: key, ...data[key] }));
        })
      );
    }

    getEmployeToday(): Observable<Employe[]> {
      return this.httpClient.get<Employe[]>(this.todayUrl);
    }
    deleteEmploye(id: string): Observable<any> {
      const deleteUrl = `${this.baseUrl}/${id}`;
      return this.httpClient.delete(deleteUrl);
    }
  }
