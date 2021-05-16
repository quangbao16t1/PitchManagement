import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { PitchDetailRoutingModule } from './pitch-detail-routing.module';
import { PitchDetailComponent } from './pitch-detail.component';
import { AddPitchComponent } from './add-pitch/add-pitch.component';
import { EditPitchComponent } from './edit-pitch/edit-pitch.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PitchDetailRoutingModule,
        ControlModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PitchDetailComponent,
        AddPitchComponent,
        EditPitchComponent
    ]
})
export class PitchDetailModule { }
