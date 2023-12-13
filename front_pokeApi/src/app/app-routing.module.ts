import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { PageNotFoundComponent } from './404/page-not-found/page-not-found.component';


const routes: Routes = [
  {path:'**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, PagesRoutingModule]
})
export class AppRoutingModule { }
