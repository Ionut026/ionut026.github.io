import { Movie } from '../../movie';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loadMoviesSuccess = createAction(
    '[Movie API] Load Success',
    props<{ movies: Movie[] }>()
);

export const loadMoviesFailure = createAction(
    '[Movie API] Load Fail',
    props<{ error: string }>()
);

export const createMovieSuccess = createAction(
    '[Movie API] Create Movie Success',
    props<{ movie: Movie }>()
);

export const createMovieFailure = createAction(
    '[Movie API] Create Movie Fail',
    props<{ error: string }>()
);

export const updateMovieSuccess = createAction(
    '[Movie API] Update Movie Success',
    props<{ movie: Movie }>()
);

export const updateMovieFailure = createAction(
    '[Movie API] Update Movie Fail',
    props<{ error: string }>()
);

export const deleteMovieSuccess = createAction(
    '[Movie API] Delete Movie Success',
    props<{ movieId: number }>()
);

export const deleteMovieFailure = createAction(
    '[Movie API] Delete Movie Fail',
    props<{ error: string }>()
);