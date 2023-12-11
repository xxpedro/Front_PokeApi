import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { FavoriteListComponent } from './favoriteList/favorite-list/favorite-list.component';
import { EditPokemonComponent } from './editPokemon/edit-pokemon/edit-pokemon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    PagesComponent,
    PokemonListComponent,
    FavoriteListComponent,
    EditPokemonComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule  ],

  exports:[PagesComponent]

})

export class PagesModule { }
