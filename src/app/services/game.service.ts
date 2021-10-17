import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  httpOption = {
    withCredentials: false,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  // public getSuperHero(): Observable<any> {
  //   let rand = Math.floor(Math.random() * 255);
  //   return this.http.get<any>(`${url}/${rand}`)
  //     .pipe(catchError(this.handleError));
  // }

  // public getSuperHeroById(id: number): Observable<any> {
  //   return this.http.get<any>(`${url}/${id}`)
  //     .pipe(catchError(this.handleError));
  // }

  // public getSuperHeroImage(url: string): Observable<any> {
  //   return this.http.get<any>(url);
  // }

  private handleError(httpError: HttpErrorResponse) {
    console.log(httpError);
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