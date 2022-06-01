import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieShellComponent } from './movie-shell/movie-shell.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { movieReducer } from './state/movie.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './state/movie.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


const movieRoutes: Routes = [
  { path: '', component: MovieShellComponent }
];

@NgModule({
  declarations: [
    MovieShellComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(movieRoutes),
    StoreModule.forFeature('movies', movieReducer),
    EffectsModule.forFeature([MovieEffects]),
    ReactiveFormsModule,
    BsDatepickerModule,
  ]
})
export class MovieModule { }
