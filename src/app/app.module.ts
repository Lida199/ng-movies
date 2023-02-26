import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskOneComponent } from './task-one/task-one.component';
import { TaskTwoComponent } from './task-two/task-two.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MOVIE_API_BASE, COUNTRY_API_BASE } from './tokens';
import { ProductionYearPipe } from './pipes/production-year.pipe';
import { ActorsNamesPipe } from './pipes/actors-names.pipe';
import { CurrenciesPipe } from './pipes/currencies.pipe';
import { FlagsPipe } from './pipes/flags.pipe';
import { RuntimePipe } from './pipes/runtime.pipe';
import { PopulationPipe } from './pipes/population.pipe';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { EditFavoriteComponent } from './edit-favorite/edit-favorite.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddToFavoritesComponent } from './add-to-favorites/add-to-favorites.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { CountriesPipe } from './pipes/countries.pipe';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { MyMoviesComponent } from './my-movies/my-movies.component';
import { EditMyMovieComponent } from './edit-my-movie/edit-my-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskOneComponent,
    TaskTwoComponent,
    ProductionYearPipe,
    ActorsNamesPipe,
    CurrenciesPipe,
    FlagsPipe,
    RuntimePipe,
    PopulationPipe,
    FavoriteMoviesComponent,
    EditFavoriteComponent,
    NotFoundComponent,
    AddToFavoritesComponent,
    AddMovieComponent,
    CountriesPipe,
    CheckboxComponent,
    MyMoviesComponent,
    EditMyMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MOVIE_API_BASE,
      useValue: environment.movieApiBase,
    },
    {
      provide: COUNTRY_API_BASE,
      useValue: environment.countryApiBase,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
