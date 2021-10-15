import { AppComponent } from './../app.component';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { sendUrl } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user = new User('','','','','');
  username: string = '';
  pass: string = '';
  constructor(private userService: UserService, private http: HttpClient) {  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  public findByUsername() : boolean 
  {
    let exists: boolean = true;
    this.userService.findByUsername(this.username)
      .subscribe(data => this.user = data)
    if(this.user == null)
    {
      exists = false;
    }
    return exists;
  }
  public logIn(user: User) : Observable<User>
  {
    return this.http.post<User>(`${sendUrl}api/user/login`, user, this.httpOptions) // url, user, this.httpOptions
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    );
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
    return throwError('Something bad happened; please fuck off')
  }
}
  
