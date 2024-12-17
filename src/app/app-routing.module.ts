import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './feature/profiles/my-profile/my-profile.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonTableSubmissionComponent } from './components/pokemon-table-submission/pokemon-table-submission.component';

const routes: Routes = [
  {path: '', component:MyProfileComponent},
  {path: 'pokemon', component:PokemonListComponent},
  {path: 'pokemon-detail/:name', component: PokemonDetailComponent},
  {path: 'pokemon-table-submission', component: PokemonTableSubmissionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
