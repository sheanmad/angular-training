import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './feature/profiles/my-profile/my-profile.component';
import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon/pokemon-detail/pokemon-detail.component';
import { PokemonTableSubmissionComponent } from './pokemon/pokemon-table-submission/pokemon-table-submission.component';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

const routes: Routes = [
  //Auth Page
  {path: 'auth', component:AuthComponent},

  //Pages with Layout
  {
    path:'',
    component:LayoutComponent,
    canActivate:  [AuthGuard],
    children:[
      {path: '', component:MyProfileComponent},
      {path: 'pokemon', component:PokemonListComponent},
      {path: 'pokemon-detail/:name', component: PokemonDetailComponent},
      {path: 'pokemon-table-submission', component: PokemonTableSubmissionComponent, canDeactivate: [CanDeactivateGuard]}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
