import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../movie';
import { MovieInterationMode } from '../state/movie.reducer';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  pageTitle = 'Movie Details';

  @Input()
  errorMessage: string | null;

  @Input()
  selectedMovie: Movie | null | undefined;

  @Input()
  interactionMode: MovieInterationMode | null;

  @Output()
  delete = new EventEmitter<Movie>();

  @Output()
  changeInterationMode = new EventEmitter<MovieInterationMode>();

  @Output()
  toggleWatched = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
  }

  onSetInsertMode() {
    this.changeInterationMode.emit(MovieInterationMode.Insert);
  }

  onSetEditMode() {
    this.changeInterationMode.emit(MovieInterationMode.Edit);
  }

  onMarkMovieAsWatched(movie: Movie) {
    this.toggleWatched.emit(movie);
  }

  onDelete(movie: Movie) {
    this.delete.emit(movie);
  }

}
