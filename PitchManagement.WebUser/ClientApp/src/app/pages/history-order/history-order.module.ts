import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HistoryOrderRoutingModule } from './history-order-routing.module';
import { HistoryOrderComponent } from './history-order.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HistoryOrderRoutingModule,
        ControlModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        NgbModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        HistoryOrderComponent

    ]
})
export class HistoryOrderModule { }
