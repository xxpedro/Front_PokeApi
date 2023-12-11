import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { PokeCardsComponent } from './pokeCards/poke-cards/poke-cards.component';
import { NavBarComponent } from './navBar/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ComponentsComponent,
    PokeCardsComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[PokeCardsComponent, NavBarComponent]
})
export class ComponentsModule { }
