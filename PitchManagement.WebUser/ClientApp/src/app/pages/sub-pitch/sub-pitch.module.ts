import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlModule } from 'src/app/helper/control.module';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { SubPitchRoutingModule } from './sub-pitch-routing.module';
import { AddSubPitchComponent } from './add-sub-pitch/add-sub-pitch.component';
import { EditSubPitchComponent } from './edit-sub-pitch/edit-sub-pitch.component';
import { SubPitchComponent } from './sub-pitch.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SubPitchRoutingModule,
        ControlModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        SubPitchComponent,
        EditSubPitchComponent,
        AddSubPitchComponent
    ]
})
export class SubPitchModule { }
