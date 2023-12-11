import { LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { favorite } from 'src/app/model/favorite';
import { Pagination, Pokemon } from 'src/app/model/pokemon';
import { environment } from 'src/enviroment/envitoment';
import { PokemonDetail } from 'src/app/model/pokemonDetails';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class PokemonServicesService {

  constructor(private _http: HttpClient, private _localStorage:LocalStorageService) {}

  getAllPokemon(page: number, pageSize: number): Observable<Pagination> {
    const offset = (page - 1) * pageSize;
    const url = `${BASE_URL}?limit=${pageSize}&offset=${offset}`;
    return this._http.get<Pagination>(url).pipe(
      catchError((error: any) => {
        console.error('Error al obtener la lista de Pokémon:', error);
        throw error;
      })
    );
  }

  getPokemonByName(name:string): favorite{

    const favoritePokemons:favorite[] = this._localStorage.retrieve('favorites')
    const pokemonFilter = favoritePokemons.filter(x=>x.name == name)[0];
    return pokemonFilter

  }

  getPokemonDetails(url: string): Observable<PokemonDetail> {
    return this._http.get<PokemonDetail>(url)
      .pipe(
        catchError((error: any) => {
          console.error('Error al obtener detalle de Pokémon:', error);
          throw error;
      })
    );
  }

  getFavoritesPokemon()
  {
    return this._localStorage.retrieve('favorites') || [];
  }

  deletePokemon(pokemonName:string)
  {
    const favoritePokemons: favorite[] = this._localStorage.retrieve('favorites');
    const indexToRemove = favoritePokemons.findIndex((pokemon) => pokemon.name === pokemonName);
    favoritePokemons.splice(indexToRemove, 1);
    this._localStorage.store('favorites', favoritePokemons);
  }

  updatePokemon(lastPokemonName:string,newPokemonName:string){
    const favoritePokemons:favorite[] = this._localStorage.retrieve('favorites')
    const pokemonFilter = favoritePokemons.filter(x=>x.name == lastPokemonName)[0];
    pokemonFilter.name = newPokemonName;
  }
}
