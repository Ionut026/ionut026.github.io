import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'about', component: AboutComponent },
      {
        path: 'movies',
        // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./movies/movie.module').then(m => m.MovieModule)
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
