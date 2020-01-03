import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PokemonComponent } from './pokemon.component';
import { ManagePokemonsComponent } from './manage/manage.component';
import { PokemonRoutingModule } from './pokemon.routing';
import { PokemonService } from './services/pokemon.service';
import { CardModule } from '../comman/comman.module';


@NgModule({
  declarations: [
    PokemonComponent,
    ManagePokemonsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    BsDatepickerModule,
    TimepickerModule,
    ReactiveFormsModule,
    PokemonRoutingModule,
    CardModule
  ],
  providers: [PokemonService]
})
export class PokemonModule { }
