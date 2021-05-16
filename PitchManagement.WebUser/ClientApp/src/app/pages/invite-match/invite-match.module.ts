import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InviteMatchRoutingModule } from './invite-match-routing.module';
import { InviteMatchComponent } from './invite-match.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        NgxPaginationModule,
        InviteMatchRoutingModule,
        NgSelectModule,
        NgbModule,
        AutocompleteLibModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        InviteMatchComponent,
    ]
})
export class InviteMatchModule { }
