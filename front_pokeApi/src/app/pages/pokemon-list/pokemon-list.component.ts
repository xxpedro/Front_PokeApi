import { Component, OnInit } from '@angular/core';
import { PokemonServicesService } from '../pagesServices/pokemon/pokemon-services.service';
import { LocalStorageService } from 'ngx-webstorage';
import { favorite } from 'src/app/model/favorite';
import Swal from 'sweetalert2';
import { Pokemon, Pagination } from 'src/app/model/pokemon';
import { PokemonDetail } from 'src/app/model/pokemonDetails';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonList!: Pokemon[];
  pokemonImages: { [url: string]: string } = {};
  favoritesPokemons:favorite[] = [];
  currentPage = 1;
  pageSize = 9;

  constructor(private _pokemonServices: PokemonServicesService,private _localstorageService: LocalStorageService) {}

  getPokemonList(page: number):void {
    this._pokemonServices.getAllPokemon(page, this.pageSize).subscribe((pokemons: Pagination) => {
      this.pokemonList = pokemons.results;
      this.loadPokemonDetails();
    });
  }


  loadPokemonDetails(): void {
    this.pokemonList.forEach((pokemon:Pokemon) => {
      this._pokemonServices.getPokemonDetails(pokemon.url).subscribe((details: PokemonDetail) => {
        pokemon.name = details.name;
        pokemon.image = details.sprites.front_default;
      });
    });
  }



  addFavorite(pokemon: Pokemon): void {

    const currentDate = new Date();
    const favoritePokemon: favorite = { ...pokemon, createdAt: currentDate };
    favoritePokemon.createdAt = currentDate;
    const existingFavorites: favorite[] = this._localstorageService.retrieve('favorites') || [];
    const pokemonExists = this.checkIfPokemonExists(existingFavorites, favoritePokemon);

    if (!pokemonExists) {
      this.addToFavorites(existingFavorites, favoritePokemon);
    } else {
      this.showPokemonExistsAlert(favoritePokemon);
    }
  }

  checkIfPokemonExists(favorites: favorite[], pokemon: favorite): boolean {
    return favorites.some((existingPokemon) => existingPokemon.name === pokemon.name);
  }

  addToFavorites(favorites: favorite[], pokemon: favorite): void {
    favorites.push(pokemon);
    this._localstorageService.store('favorites', favorites);
    this.showPokemonAddedAlert(pokemon);
  }

  showPokemonExistsAlert(pokemon: favorite): void {
    Swal.fire({
      title: '',
      text: `${pokemon.name} ya existe en tu lista de favoritos`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  }

  showPokemonAddedAlert(pokemon: favorite): void {
    Swal.fire({
      title: 'Pokemon Agregado',
      text: `Has agregado a ${pokemon.name} a tu lista de favoritos!`,
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }


  nextPage(): void {
    this.currentPage++;
    this.getPokemonList(this.currentPage);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getPokemonList(this.currentPage);
    }
  }


  ngOnInit(): void {
    this.getPokemonList(this.currentPage);

  }

}



