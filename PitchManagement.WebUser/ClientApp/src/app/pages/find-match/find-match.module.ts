import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { FindMatchComponent } from './find-match.component';
import { FindMatchRoutingModule } from './find-match-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        NgxPaginationModule,
        FindMatchRoutingModule,
        NgSelectModule,
        NgbModule,
        AutocompleteLibModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        FindMatchComponent,
    ]
})
export class FindMatchModule { }
