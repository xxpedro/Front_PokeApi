import { Routes, RouterModule } from '@angular/router';
import { Component, NgModule } from '@angular/core';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FavoriteListComponent } from './favoriteList/favorite-list/favorite-list.component';
import { EditPokemonComponent } from './editPokemon/edit-pokemon/edit-pokemon.component';
const routes: Routes = [
  {path:'',component:PokemonListComponent},
  {path:'favorites',component:FavoriteListComponent},
  {path:'edit/:name', component:EditPokemonComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
