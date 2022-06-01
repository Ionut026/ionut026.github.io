import { Movie } from "../movie";

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { MovieApiActions, MoviePageActions } from './actions';

export enum MovieInterationMode {
    'View',
    'Insert',
    'Edit'
}

export interface MovieState {
    currentMovieId: number | null;
    movies: Movie[];
    error: string;
    interationMode: MovieInterationMode
}

const initialState: MovieState = {
    currentMovieId: null,
    movies: [],
    error: '',
    interationMode: MovieInterationMode.View
};

export const movieReducer = createReducer<MovieState>(
    initialState,
    on(MoviePageActions.changeInterationMode, (state, action): MovieState => {
        return {
            ...state,
            interationMode: action.interactionMode,
            currentMovieId: action.interactionMode === MovieInterationMode.Insert ? 0 : state.currentMovieId !== 0 ? state.currentMovieId : null
        };
    }),
    on(MoviePageActions.setCurrentMovie, (state, action): MovieState => {
        return {
            ...state,
            currentMovieId: action.currentMovieId,
            interationMode: MovieInterationMode.View
        };
    }),
    on(MoviePageActions.clearCurrentMovie, (state): MovieState => {
        return {
            ...state,
            currentMovieId: null,
            interationMode: MovieInterationMode.View
        };
    }),
    on(MoviePageActions.initializeCurrentMovie, (state): MovieState => {
        return {
            ...state,
            currentMovieId: 0
        };
    }),
    on(MovieApiActions.loadMoviesSuccess, (state, action): MovieState => {
        return {
            ...state,
            movies: action.movies,
            error: '',
            interationMode: MovieInterationMode.View
        };
    }),
    on(MovieApiActions.loadMoviesFailure, (state, action): MovieState => {
        return {
            ...state,
            movies: [],
            error: action.error,
            interationMode: MovieInterationMode.View
        };
    }),
    on(MovieApiActions.createMovieSuccess, (state, action): MovieState => {
        return {
            ...state,
            movies: [...state.movies, action.movie],
            currentMovieId: action.movie.id,
            error: '',
            interationMode: MovieInterationMode.View
        }
    }),
    on(MovieApiActions.createMovieFailure, (state, action): MovieState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(MovieApiActions.updateMovieSuccess, (state, action): MovieState => {
        const updatedMovies = state.movies.map(
            movie => action.movie.id === movie.id ? action.movie : movie);
        return {
            ...state,
            movies: updatedMovies,
            currentMovieId: action.movie.id,
            error: '',
            interationMode: MovieInterationMode.View
        }
    }),
    on(MovieApiActions.updateMovieFailure, (state, action): MovieState => {
        return {
            ...state,
            error: action.error
        }
    }),
    on(MovieApiActions.deleteMovieSuccess, (state, action): MovieState => {
        return {
            ...state,
            movies: state.movies.filter(movie => movie.id !== action.movieId),
            currentMovieId: null,
            error: '',
            interationMode: MovieInterationMode.View
        }
    }),
    on(MovieApiActions.deleteMovieFailure, (state, action): MovieState => {
        return {
            ...state,
            error: action.error
        }
    })
);