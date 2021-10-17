import { GameBoard, GameUpdate } from './../models/gameboard';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { CookieService } from './cookie-service.service';
import { Observable, throwError } from 'rxjs';
import { sendUrl } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private generateHeaders(): any {
    return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.cookieService.getCookie('Token') });
  }

  public getGame(): Observable<HttpResponse<GameBoard>> 
  {
    return this.http.get<GameBoard>(`${sendUrl}api/user/get`, {observe: 'response', headers: this.generateHeaders()})
      .pipe( catchError(this.handleError) );
  }

  public updateGame(gameUpdate: GameUpdate): Observable<HttpResponse<any>> 
  {
    return this.http.post<any>(`${sendUrl}api/user/get`, gameUpdate, {observe: 'response', headers: this.generateHeaders()})
      .pipe( catchError(this.handleError) );
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
