import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartdemoRoutingModule } from './chartdemo-routing.module';
import { ChartdemoComponent } from './chartdemo.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartdemoRoutingModule,
        ControlModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        NgbModule,
        ChartsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        ChartdemoComponent

    ]
})
export class ChartdemoModule { }
