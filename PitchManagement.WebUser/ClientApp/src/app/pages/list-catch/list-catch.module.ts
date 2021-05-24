import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListCatchRoutingModule } from './list-catch-routing.module';
import { ListCatchComponent } from './list-catch.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        NgxPaginationModule,
        ListCatchRoutingModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ListCatchComponent,
    ]
})
export class ListCatchModule { }
