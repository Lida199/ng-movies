import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFavoriteComponent } from './edit-favorite/edit-favorite.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddToFavoritesComponent } from './add-to-favorites/add-to-favorites.component';
import { TaskOneComponent } from './task-one/task-one.component';
import { TaskTwoComponent } from './task-two/task-two.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { EditMyMovieComponent } from './edit-my-movie/edit-my-movie.component';

const routes: Routes = [
  {
    path: '',
    component: TaskOneComponent,
  },
  {
    path: 'add',
    component: AddToFavoritesComponent,
  },
  {
    path: 'add-movie',
    component: AddMovieComponent,
  },
  {
    path: 'task-2',
    component: TaskTwoComponent,
  },
  {
    path: 'favorite-movies',
    component: FavoriteMoviesComponent,
  },
  {
    path: 'favorite-movies/:id',
    component: EditFavoriteComponent,
  },
  {
    path: 'my-movies',
    component: MyMoviesComponent,
  },
  {
    path: 'my-movies/:id',
    component: EditMyMovieComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
