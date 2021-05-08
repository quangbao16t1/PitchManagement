import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppModule } from 'src/app/app.module';
import { ControlModule } from 'src/app/helper/control.module';
import { UserProFileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { EditUserProflieComponent } from './edit-user-proflie/edit-user-proflie.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        UserProFileRoutingModule,
        ControlModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        UserProfileComponent,
        EditUserProflieComponent
    ]
})
export class UserProfileModule { }
