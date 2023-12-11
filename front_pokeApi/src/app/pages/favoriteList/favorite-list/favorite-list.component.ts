import { Component } from '@angular/core';
import { favorite } from 'src/app/model/favorite';
import { PokemonServicesService } from '../../pagesServices/pokemon/pokemon-services.service';
import { LocalStorageService } from 'ngx-webstorage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent {

  favoritesPokemons:favorite[] = [];
  pageSize:number = 6;
  currentPage:number = 1
  constructor(private _pokemonServices: PokemonServicesService) {}

  getPokemonList() {
    this.favoritesPokemons = this._pokemonServices.getFavoritesPokemon();
  }

  deletePokemon(pokemonName:string){
    Swal.fire({
      title: 'Eliminar Pokémon!',
      text: '¿Aún desea eliminar el Pokémon?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this._pokemonServices.deletePokemon(pokemonName);
        Swal.fire('Eliminado!', 'El Pokémon ha sido eliminado.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'La operación ha sido cancelada.', 'info');
      }
    });

  }

  ngOnInit(): void {
    this.getPokemonList();

  }






}
