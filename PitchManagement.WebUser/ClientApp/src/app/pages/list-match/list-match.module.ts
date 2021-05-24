import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListMatchRoutingModule } from './list-match-routing.module';
import { ListMatchComponent } from './list-match.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        NgxPaginationModule,
        ListMatchRoutingModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ListMatchComponent,
    ]
})
export class ListMatchModule { }
