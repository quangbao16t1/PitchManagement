import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import { AddPitchComponent } from './add-pitch/add-pitch.component';
import { EditPitchComponent } from './edit-pitch/edit-pitch.component';
import { PitchRoutingModule } from './pitch-routing.module';
import { PitchComponent } from './pitch.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PitchRoutingModule,
        ControlModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        PitchComponent,
        EditPitchComponent,
        AddPitchComponent
    ]
})
export class PitchModule { }
