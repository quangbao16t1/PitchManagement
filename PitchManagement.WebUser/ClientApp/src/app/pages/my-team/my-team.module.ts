import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { MyTeamComponent } from './my-team.component';
import { MyTeamRoutingModule } from './my-team-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        MyTeamRoutingModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        MyTeamComponent
    ]
})
export class MyTeamModule { }
