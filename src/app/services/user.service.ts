import { AppComponent } from './../app.component';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sendUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user = new User('', '', '', '', '')

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  public registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${sendUrl}api/user/add`, user, this.httpOptions) // url, user, this.httpOptions
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    )
  }
  public logOut(): Observable<any>
  {
    return this.http.get(`${sendUrl}api/user/logout`)
      .pipe(
        catchError(this.handleError)
      )
  }
  public findByUsername(username: string): Observable<User> {

    return this.http.get<User>(`${sendUrl}/find/${username}`)
      .pipe(
        catchError(this.handleError)
      )
  }
  private handleError(httpError: HttpErrorResponse) {

    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occured, handle it accordingly
      console.log('And error occured: ', httpError.error.message)
    } else {
      // the backend returned an unsuccessful response code
      // the reponse body might have clues for what went wrong
      console.error(`
        Backend returned code ${httpError.status}, 
        body was: ${httpError.error}
      `)
    }
    // throwError is an Observable from rxJS
    return throwError(httpError.error)
  }
}


