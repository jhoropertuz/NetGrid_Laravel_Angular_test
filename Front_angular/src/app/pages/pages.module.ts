import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PerfilComponent } from './user/perfil/perfil.component';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listPokemon',
    pathMatch: 'full',
  },
  {
    path: 'listPokemon',
    component: ListPokemonComponent
  },
  {
    path: 'listFavorites',
    component: FavoritesComponent
  },
  {
    path: 'perfil',
    component: PerfilComponent
  }
];

@NgModule({
  declarations: [
    PagesComponent,
    ListPokemonComponent,
    FavoritesComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
})
export class PagesModule { }
