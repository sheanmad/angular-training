import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './feature/profiles/profile/profile.component';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  //Auth Page
  {path: 'auth', component:AuthComponent},

  //Pages with Layout
  {
    path:'',
    component:LayoutComponent,
    canActivate:  [AuthGuard],
    children:[
      {path: 'pokemon',
        loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule),
      },
      {path: '', component:MyProfileComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
