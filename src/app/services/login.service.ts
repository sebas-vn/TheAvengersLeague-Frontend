import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { sendUrl } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { LoginMessage } from '../models/login-message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private userService: UserService, private http: HttpClient) {  }
  private httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public logIn(login: LoginMessage) : Observable<User>
  {
    const response =  this.http.post<User>(`${sendUrl}api/user/login`, login, this.httpOptions )
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    );
    return response;
  }
  
  private handleError(httpError: HttpErrorResponse) {
    // throwError is an Observable from rxJS
    if('error' in httpError.error)
      return throwError(httpError.error.error)
    else if('status' in httpError.error)
      return throwError(httpError.error.status)
    else
      return throwError('Something went very wrong trying to login')
  }
}
  
