import { Movie } from '../../movie';

/* NgRx */
import { createAction, props } from '@ngrx/store';
import { MovieInterationMode } from '../movie.reducer';

export const setCurrentMovie = createAction(
    '[Movie Page] Set Current Movie',
    props<{ currentMovieId: number }>());

export const clearCurrentMovie = createAction(
    '[Movie Page] Clear Current Movie');

export const initializeCurrentMovie = createAction(
    '[Movie Page] Initialize Current Movie');

export const loadMovies = createAction(
    '[Movie Page] Load Movies');

export const createMovie = createAction(
    '[Movie Page] Create Movie',
    props<{ movie: Movie }>());

export const updateMovie = createAction(
    '[Movie Page] Update Movie',
    props<{ movie: Movie }>());

export const toggleWatched = createAction(
    '[Movie Page] Toggle Watched',
    props<{ movie: Movie }>());

export const deleteMovie = createAction(
    '[Movie Page] Delete Movie',
    props<{ movieId: number }>());

export const changeInterationMode = createAction(
    '[Movie Page] Change Interation Mode',
    props<{ interactionMode: MovieInterationMode }>());

