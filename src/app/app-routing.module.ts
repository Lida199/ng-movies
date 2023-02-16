import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFavoriteComponent } from './edit-favorite/edit-favorite.component';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddToFavoritesComponent } from './add-to-favorites/add-to-favorites.component';
import { TaskOneComponent } from './task-one/task-one.component';
import { TaskTwoComponent } from './task-two/task-two.component';

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
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
