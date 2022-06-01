import { Injectable } from "@angular/core";

import { Movie } from "../movie";

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieApiActions, MoviePageActions } from './actions';
import { MovieService } from "../movie.service";
import { catchError, concatMap, map, mergeMap, of } from "rxjs";


@Injectable()
export class MovieEffects {

    constructor(private actions$: Actions, private movieService: MovieService) { }

    loadMovies$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MoviePageActions.loadMovies),
            mergeMap(() => this.movieService.getMovies()
                .pipe(map(movies => MovieApiActions.loadMoviesSuccess({ movies })),
                    catchError(error => of(MovieApiActions.loadMoviesFailure({ error })))))
        )
    });

    createMovie$ = createEffect(() => {
        return this.actions$.pipe(ofType(MoviePageActions.createMovie), concatMap(action =>
            this.movieService.createMovie(action.movie)
                .pipe(
                    map(movie => MovieApiActions.createMovieSuccess({ movie })),
                    catchError(error => of(MovieApiActions.createMovieFailure({ error })))
                )
        ))
    });

    updateMovie$ = createEffect(() => {
        return this.actions$.pipe(ofType(MoviePageActions.updateMovie), concatMap(action =>
            this.movieService.updateMovie(action.movie)
                .pipe(
                    map(movie => MovieApiActions.updateMovieSuccess({ movie })),
                    catchError(error => of(MovieApiActions.updateMovieFailure({ error })))
                )
        ))
    });

    toggleWatched$ = createEffect(() => {
        return this.actions$.pipe(ofType(MoviePageActions.toggleWatched), concatMap(action =>
            this.movieService.updateMovie({ ...action.movie, watched: !action.movie.watched })
                .pipe(
                    map(movie => MovieApiActions.updateMovieSuccess({ movie })),
                    catchError(error => of(MovieApiActions.updateMovieFailure({ error })))
                )
        ))
    });

    deleteMovie$ = createEffect(() => {
        return this.actions$.pipe(ofType(MoviePageActions.deleteMovie), mergeMap(action =>
            this.movieService.deleteMovie(action.movieId)
                .pipe(
                    map(() => MovieApiActions.deleteMovieSuccess({ movieId: action.movieId })),
                    catchError(error => of(MovieApiActions.deleteMovieFailure({ error })))
                )
        ))
    });


}