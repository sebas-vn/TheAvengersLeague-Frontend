import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

import { accessToken } from "../../environments/environment";

const url = `https://superheroapi.com/api/${accessToken}`;

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {

  

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  public getSuperHero(): Observable<any> {
    return this.http.get<any>(`${url}/41`)
      .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      // A client-side or network error occurred, handle it accordingly
      console.log('An error occurred: ', httpError.error.message);
    } else {
      // the backend returned an unsuccessful response code
      // the response body might have clues for what went wrong
      console.error(`
        Backend returned code ${httpError.status},
        body was: ${httpError.error}
      `);

      return throwError('Something bad happened; please try again later');
    }
  }

}