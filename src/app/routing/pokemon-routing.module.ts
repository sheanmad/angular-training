import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from "../pokemon/pokemon-list/pokemon-list.component";
import { PokemonDetailComponent } from "../pokemon/pokemon-detail/pokemon-detail.component";
import { PokemonTableSubmissionComponent } from "../pokemon/pokemon-table-submission/pokemon-table-submission.component";
import { CanDeactivateGuard } from "../guards/can-deactivate.guard";
import { PokemonCartComponent } from "../pokemon/pokemon-cart/pokemon-cart.component";

const routes: Routes = [
    {path: '', component:PokemonListComponent},
    {path: 'detail/:name', component: PokemonDetailComponent},
    {path: 'submission', component: PokemonTableSubmissionComponent, canDeactivate: [CanDeactivateGuard]},
    {path: 'cart', component: PokemonCartComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonRoutingModule {}