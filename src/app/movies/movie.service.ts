import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private moviesUrl = 'api/movies';

  constructor(private http: HttpClient) { }

  /**
   * Gets all available movies.
   * @returns The list with all available movies.
   */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        map(data => data.map(movie => this.mapMovieToMovieWithDateAttributes(movie))),
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new movie
   * @param movie the new movie.
   * @returns Returns the newly created movie.
   */
  createMovie(movie: Movie): Observable<Movie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Movie Id must be null for the Web API to assign an Id
    const newMovie = { ...movie, id: null };
    return this.http.post<Movie>(this.moviesUrl, newMovie, { headers })
      .pipe(
        tap(data => console.log('createMovie: ' + JSON.stringify(data))),
        map(movie => this.mapMovieToMovieWithDateAttributes(movie)),
        catchError(this.handleError)
      );
  }

  /**
   * Update a movie,
   * @param movie the modified movie to be saved.
   * @returns The updated movie after save operation.
   */
  updateMovie(movie: Movie): Observable<Movie> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.moviesUrl}/${movie.id}`;
    return this.http.put<Movie>(url, movie, { headers })
      .pipe(
        tap(() => console.log('updateMovie: ' + movie.id)),
        // Return the movie on an update
        map(() => movie),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes a movie.
   * @param id the id of the movie to delete.
   * @returns empty observable to notify that the operation was successfull.
   */
  deleteMovie(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.moviesUrl}/${id}`;
    return this.http.delete<Movie>(url, { headers })
      .pipe(
        tap(data => console.log('deleteMovie: ' + id)),
        catchError(this.handleError)
      );
  }

  /**
   * Helper method for handling errors.
   * @param err the error object.
   * @returns returns a new error containing the error message.
   */
  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  /**
   * Maps the movie object to a new movie with strongly typed Date attributes.
   * @param movie The input movie object.
   * @returns The mapped movie object.
   */
  private mapMovieToMovieWithDateAttributes(movie: Movie): Movie {
    return { ...movie, releaseDate: movie.releaseDate ? new Date(movie.releaseDate) : null }
  }
}
