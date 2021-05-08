import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AppModule } from 'src/app/app.module';
import { ControlModule } from 'src/app/helper/control.module';
import { UserManagementComponent } from './user-management.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        UserManagementRoutingModule,
        ControlModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        UserManagementComponent,
        AddUserComponent,
        EditUserComponent
    ]
})
export class UserManagementModule { }
