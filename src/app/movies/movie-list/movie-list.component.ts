import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  pageTitle = "Movies";

  @Input()
  errorMessage: string | null = '';

  @Input()
  movies: Movie[] | null;

  @Input()
  selectedMovie: Movie | null | undefined = null;

  @Output()
  movieWasSelected = new EventEmitter<Movie>();

  constructor() { }

  ngOnInit(): void {
  }

  movieSelected(movie: Movie) {
    this.movieWasSelected.emit(movie);
  }
}
