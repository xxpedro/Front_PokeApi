import { favorite } from 'src/app/model/favorite';
import { Component } from '@angular/core';
import { PokemonServicesService } from '../../pagesServices/pokemon/pokemon-services.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent {
currentPokemon!:favorite;
editForm!: FormGroup;

constructor(private _pokemonServices: PokemonServicesService,private route: ActivatedRoute,private formBuilder: FormBuilder){}


getCurrentPokemon()
{
  const nameParam = this.route.snapshot.paramMap.get('name');
  const pokemonName = nameParam !== null ? nameParam : '';
  this.currentPokemon =this._pokemonServices.getPokemonByName(pokemonName)

}

updatePokemon()
{
  if(this.editForm.valid)
  {
    const editedPokemonName = this.editForm.value.pokemonName;
    this._pokemonServices.updatePokemon(this.currentPokemon.name,editedPokemonName)
    Swal.fire({title: '',text: 'Pokemon editado con exito',icon: 'success', confirmButtonText: 'Ok'});
    return
  }
  Swal.fire({title: 'Información',text: 'El nombre es requerido',icon: 'info', confirmButtonText: 'Ok'});
}

initializeForm(){
  this.editForm = this.formBuilder.group({
    pokemonName: [this.currentPokemon.name, Validators.required],
  });

}

ngOnInit() {
  this.getCurrentPokemon();
  this.initializeForm();

}



}
