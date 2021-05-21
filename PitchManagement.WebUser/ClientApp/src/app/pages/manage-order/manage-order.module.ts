import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ManageOrderComponent } from './manage-order.component';
import { ManageOrderRoutingModule } from './manage-order-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ManageOrderRoutingModule,
        ControlModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        NgbModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ManageOrderComponent

    ]
})
export class ManageOrderModule { }
