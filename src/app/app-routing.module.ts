import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {HomeComponent} from './components/home/home.component';
import {UncaughtPokemonComponent} from './components/uncaught-pokemon/uncaught-pokemon.component';
import {CompeitiveTeamBuilderComponent} from './components/compeitive-team-builder/compeitive-team-builder.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'uncaught',
    component: UncaughtPokemonComponent
  },
  {
    path: 'compeitive',
    component: CompeitiveTeamBuilderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
