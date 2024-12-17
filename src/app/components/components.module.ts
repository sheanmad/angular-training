import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonFormSubmissionsComponent } from './pokemon-form-submissions/pokemon-form-submissions.component';
import { PokemonTableSubmissionComponent } from './pokemon-table-submission/pokemon-table-submission.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonFormSubmissionsComponent,
    PokemonTableSubmissionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonFormSubmissionsComponent
  ]
})
export class ComponentsModule { }