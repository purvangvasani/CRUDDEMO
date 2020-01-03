import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CardComponent } from './card-component/card.component';


@NgModule({
    declarations: [
        CardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgSelectModule,
        BsDatepickerModule,
        TimepickerModule,
        ReactiveFormsModule
    ],
    exports: [
        CardComponent
    ],
    providers: []
})
export class CardModule { }
