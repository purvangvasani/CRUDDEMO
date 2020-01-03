import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonComponent } from './pokemon.component';
import { ManagePokemonsComponent } from './manage/manage.component';

const routes: Routes = [
    { path: '', component: PokemonComponent },
    { path: 'manage', component: ManagePokemonsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonRoutingModule { }
