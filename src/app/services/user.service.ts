import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { sendUrl } from 'src/environments/environment';
import { ModifyUser, ModifyDecks } from '../models/modify-user';
import { UserInventory } from '../models/user-inventory';
import { LoginMessage } from '../models/login-message';
import { UserDecks } from '../models/user-decks';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static token: string = '';

  constructor(private http: HttpClient) { }

  private generateHeaders(): any {
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.getCookie('Token') });
  }

  public logIn(login: LoginMessage) : Observable<HttpResponse<User>>
  {
    const response = this.http.post<User>(`${sendUrl}api/user/login`, login, {observe: 'response', headers: this.generateHeaders()} )
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    );
    response.subscribe(
      resp => {
        //UserService.token = resp.headers.get('authorization')
        this.setCookie('Token', resp.headers.get('authorization'), 14)
      }
    );
    return response;
  }

  public registerUser(user: User): Observable<HttpResponse<User>> {
    const response = this.http.post<User>(`${sendUrl}api/user/add`, user, {observe: 'response', headers: this.generateHeaders()}) // url, user, this.httpOptions
      .pipe( // we are calling a method on the data returned in the observable
        catchError(this.handleError) // passing a callback
      )
    response.subscribe(
      resp => this.setCookie('Token', resp.headers.get('authorization'), 14)
    );
    return response;
  }

  public logOut(): Observable<HttpResponse<any>>
  {
    const response = this.http.get<any>(`${sendUrl}api/user/logout`, {observe: 'response', headers: this.generateHeaders()})
      .pipe(
        catchError(this.handleError)
      );
    return response;
  }



  public getCurrent():Observable<HttpResponse<User>> 
  {
    console.log(UserService.token)
    return this.http.get<User>(`${sendUrl}api/user/get`, {observe: 'response', headers: this.generateHeaders()})
    .pipe( // we are calling a method on the data returned in the observable
      catchError(this.handleError) // passing a callback
    )
  }

  public modifyAccount(modify: ModifyUser): Observable<HttpResponse<User>>
  {
    return this.http.post<User>(`${sendUrl}api/user/modify`, modify, {observe: 'response', headers: this.generateHeaders()})
      .pipe(
        catchError(this.handleError)
      );
  }

  public modifyDecks(modify: ModifyDecks): Observable<HttpResponse<User>>
  {
    return this.http.post<User>(`${sendUrl}api/user/modify/decks`, modify, {observe: 'response', headers: this.generateHeaders()})
      .pipe(
        catchError(this.handleError)
      );
  }

  public getInventory(id: number): Observable<HttpResponse<UserInventory>>
  {
    return this.http.get<UserInventory>(`${sendUrl}api/user/inventory/id=${id}`, {observe: 'response', headers: this.generateHeaders()})
      .pipe(
        catchError(this.handleError)
      );
  }

  public getDecks(id: number): Observable<HttpResponse<UserDecks>>
  {
    return this.http.get<UserDecks>(`${sendUrl}api/user/decks/id=${id}`, {observe: 'response', headers: this.generateHeaders()})
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

  private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    let d:Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires:string = `expires=${d.toUTCString()}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  private deleteCookie(name) {
      this.setCookie(name, '', -1);
  }

  private getCookie(name: string) {
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
          c = ca[i].replace(/^\s+/g, '');
          if (c.indexOf(cookieName) == 0) {
              return c.substring(cookieName.length, c.length);
          }
      }
      return '';
  }

}


