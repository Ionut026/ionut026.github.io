
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../movie';
import { MovieInterationMode } from '../state/movie.reducer';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  pageTitle = 'Edit Movie';

  @Input()
  errorMessage: string | null = '';

  @Input()
  selectedMovie: Movie | null | undefined = null;

  @Output()
  create = new EventEmitter<Movie>();

  @Output()
  update = new EventEmitter<Movie>();

  @Output()
  delete = new EventEmitter<Movie>();

  @Output()
  changeInterationMode = new EventEmitter<MovieInterationMode>();

  editFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editFormGroup = this.formBuilder.group(
      {
        name: ['', [
          Validators.required,
        ]],
        directorName: ['', [
          Validators.required,
        ]],
        releaseDate: [new Date(), [
          Validators.required,
        ]],
        rating: [5],
        synopsis: [''],
        watched: [false],
        posterImgUrl: ['']
      }
    );
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.editFormGroup.reset();
    this.editFormGroup.patchValue({
      name: this.selectedMovie?.name,
      directorName: this.selectedMovie?.directorName,
      releaseDate: this.selectedMovie?.releaseDate ? new Date(this.selectedMovie?.releaseDate) : null,
      rating: this.selectedMovie?.rating,
      synopsis: this.selectedMovie?.synopsis,
      watched: this.selectedMovie?.watched,
      posterImgUrl: this.selectedMovie?.posterImgUrl
    })
  }

  onSubmit() {
    if (this.editFormGroup.dirty && this.editFormGroup.valid) {
      const movie = { ...this.selectedMovie, ...this.editFormGroup.value };

      if (movie.id == 0) {
        this.create.emit(movie);
      }
      else {
        this.update.emit(movie);
      }
    }
  }

  onCancel() {
    this.changeInterationMode.emit(MovieInterationMode.View);
  }

  onDelete(movie: Movie) {
    this.delete.emit(movie);
  }

}
