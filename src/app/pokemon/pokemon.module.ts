import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonFormSubmissionsComponent } from './pokemon-form-submissions/pokemon-form-submissions.component';
import { PokemonTableSubmissionComponent } from './pokemon-table-submission/pokemon-table-submission.component';
import { PokemonRoutingModule } from '../routing/pokemon-routing.module';
import { PokemonCartComponent } from './pokemon-cart/pokemon-cart.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonFormSubmissionsComponent,
    PokemonTableSubmissionComponent,
    PokemonCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PokemonRoutingModule
  ],
  exports: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonFormSubmissionsComponent
  ]
})
export class PokemonModule { }