import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateMatchComponent } from './create-match.component';
import { CreateMatchRoutingModule } from './create-match-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        NgxPaginationModule,
        CreateMatchRoutingModule,
        NgSelectModule,
        AutocompleteLibModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        CreateMatchComponent,
    ]
})
export class CreateMatchModule { }
