import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;

  roleAs:string;
  loginSubject = new Subject<string>();

  endpoint: string = environment.baseApiURL+'/auth'
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient, public router: Router) {}
  
  // Sign-up
  inscription(user: User): Observable<any> {
    let api = `${this.endpoint}/inscription`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }
  
  // Sign-in
  login(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('STATE', 'true');
        localStorage.setItem('ROLE', res.role);
        this.loginSubject.next(res.role);
        this.router.navigate(['entrees']);
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    
    return this.isLogin;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    this.loginSubject.next('');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  getRole() {
    this.roleAs = ''+localStorage.getItem('ROLE');
    return this.roleAs;
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}
