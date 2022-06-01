import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../movie';
import { getCurrentMovie, getError, getInteractionMode, getMovies, State } from '../state';
import { MoviePageActions } from '../state/actions';
import { MovieInterationMode } from '../state/movie.reducer';

@Component({
  selector: 'app-movie-shell',
  templateUrl: './movie-shell.component.html',
  styleUrls: ['./movie-shell.component.scss']
})
export class MovieShellComponent implements OnInit {

  MovieInterationModeType = MovieInterationMode

  interactionMode$: Observable<MovieInterationMode>;
  selectedMovie$: Observable<Movie | null | undefined>;
  movies$: Observable<Movie[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.movies$ = this.store.select(getMovies);

    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(MoviePageActions.loadMovies());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedMovie$ = this.store.select(getCurrentMovie);

    // Do NOT subscribe here because it uses an async pipe
    this.interactionMode$ = this.store.select(getInteractionMode);
  }

  movieSelected(movie: Movie) {
    this.store.dispatch(MoviePageActions.setCurrentMovie({ currentMovieId: movie.id }));
  }

  deleteMovie(movie: Movie) {
    this.store.dispatch(MoviePageActions.deleteMovie({ movieId: movie.id }));
  }

  createMovie(movie: Movie) {
    this.store.dispatch(MoviePageActions.createMovie({ movie }));
  }

  updateMovie(movie: Movie) {
    this.store.dispatch(MoviePageActions.updateMovie({ movie }));
  }

  toggleWatchedFlag(movie: Movie) {
    this.store.dispatch(MoviePageActions.toggleWatched({ movie }));
  }

  changeInterationMode(interactionMode: MovieInterationMode) {
    this.store.dispatch(MoviePageActions.changeInterationMode({ interactionMode }));
  }
}
