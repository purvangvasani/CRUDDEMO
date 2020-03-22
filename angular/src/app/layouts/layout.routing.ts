import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HelplineComponent } from '../helpline/helpline.component';
import { SourcesComponent } from '../sources/sources.component';
import { TestCentresComponent } from '../test-centres/test-centres.component';

const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'pokemons', loadChildren: '../pokemon/pokemon.module#PokemonModule' },
            {
                path: 'helpline', component: HelplineComponent
            },
            {
                path: 'sources', component: SourcesComponent
            },
            {
                path: 'test-centres', component: TestCentresComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule { }