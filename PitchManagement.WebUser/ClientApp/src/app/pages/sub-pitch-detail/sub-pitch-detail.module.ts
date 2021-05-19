import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubPitchDetailComponent } from './sub-pitch-detail.component';
import { SubPitchDetailRoutingModule } from './sub-pitch-detail-routing.module';
import { AddSubPitchDetailComponent } from './add-sub-pitch-detail/add-sub-pitch-detail.component';
import { EidtSubPitchDetailComponent } from './eidt-sub-pitch-detail/eidt-sub-pitch-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SubPitchDetailRoutingModule,
        ControlModule,
        ReactiveFormsModule,
        NgbModule,
        NgxPaginationModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        SubPitchDetailComponent,
        AddSubPitchDetailComponent,
        EidtSubPitchDetailComponent
    ]
})
export class SubPitcDetailhModule { }
