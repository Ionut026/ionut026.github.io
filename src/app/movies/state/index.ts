
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Movie } from '../movie';
import { MovieState } from "./movie.reducer";

export interface State {
    movies: MovieState;
}

// Selector functions
const getMovieFeatureState = createFeatureSelector<MovieState>('movies');

export const getInteractionMode = createSelector(
    getMovieFeatureState,
    state => state.interationMode
);

export const getCurrentMovieId = createSelector(
    getMovieFeatureState,
    state => state.currentMovieId
);

export const getCurrentMovie = createSelector(
    getMovieFeatureState,
    getCurrentMovieId,
    (state, currentMovieId): Movie | null | undefined => {
        if (currentMovieId === 0) {
            return {
                id: 0,
                name: '',
                directorName: '',
                posterImgUrl: '',
                rating: 0,
                releaseDate: null,
                synopsis: '',
                watched: false
            };
        }
        else {
            return currentMovieId ? state.movies?.find(p => p.id === currentMovieId) : null;
        }
    }
)

export const getMovies = createSelector(
    getMovieFeatureState,
    state => state.movies
);

export const getError = createSelector(
    getMovieFeatureState,
    state => state.error
);