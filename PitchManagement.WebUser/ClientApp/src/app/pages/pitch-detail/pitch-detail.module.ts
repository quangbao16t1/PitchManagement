import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PitchDetailRoutingModule } from './pitch-detail-routing.module';
import { PitchDetailComponent } from './pitch-detail.component';
import { AddPitchComponent } from './add-pitch/add-pitch.component';
import { EditPitchComponent } from './edit-pitch/edit-pitch.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SubPitchComponent } from './sub-pitch/sub-pitch.component';
import { AddSubPitchComponent } from './sub-pitch/add-sub-pitch/add-sub-pitch.component';
import { EditSubPitchComponent } from './sub-pitch/edit-sub-pitch/edit-sub-pitch.component';
import { SubPitchDetailComponent } from './sub-pitch-detail/sub-pitch-detail.component';
import { AddSubPitchDetailComponent } from './sub-pitch-detail/add-sub-pitch-detail/add-sub-pitch-detail.component';
import { EidtSubPitchDetailComponent } from './sub-pitch-detail/eidt-sub-pitch-detail/eidt-sub-pitch-detail.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PitchDetailRoutingModule,
        ControlModule,
        NgbModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PitchDetailComponent,
        AddPitchComponent,
        EditPitchComponent,
        ManageOrderComponent,
        SubPitchComponent,
        AddSubPitchComponent,
        EditSubPitchComponent,
        SubPitchDetailComponent,
        AddSubPitchDetailComponent,
        EidtSubPitchDetailComponent
    ]
})
export class PitchDetailModule { }
