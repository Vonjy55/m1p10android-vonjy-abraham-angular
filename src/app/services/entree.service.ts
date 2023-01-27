import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError,Observable,catchError } from 'rxjs';
import { environment } from '../environments/environment';
import { Entree } from '../models/entree';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntreeService {

  constructor(private http:HttpClient,private authService:AuthService) { }

  base_url: string = environment.baseApiURL+'/atelier';

  findEntrees(): Observable<any>{
    return this.http.get(this.base_url+'/entrees').pipe(catchError(this.handleError));
  }

  addEntree(entree : Entree):Observable<any>{
    return this.http.post(this.base_url + '/entree',entree).pipe(catchError(this.handleError));
  }

  findLastEntree(idVoiture: string):Observable<any>{
    return this.http.get(environment.baseApiURL+'/entrees',{
      params:{voiture:idVoiture}
    })
    .pipe(catchError(this.handleError));
  }



  // Error
  handleError(error: HttpErrorResponse) {
    console.error(error);
    
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
