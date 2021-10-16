import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sendUrl } from 'src/environments/environment';
import { ModifyUser } from '../models/modify-user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = new User('', '', '', '', '')

  constructor(private http: HttpClient) { }
  httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${sendUrl}api/user/add`, user, this.httpOptions) // url, user, this.httpOptions
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    )
  }

  public getCurrent(): Observable<User> {
    return this.http.get<User>(`${sendUrl}api/user/get`, this.httpOptions)
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    )
  }

  public logOut(): Observable<any>
  {
    return this.http.get(`${sendUrl}api/user/logout`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public modifyAccount(modify: ModifyUser): Observable<User>
  {
    return this.http.post<User>(`${sendUrl}api/user/modify`, modify, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
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


