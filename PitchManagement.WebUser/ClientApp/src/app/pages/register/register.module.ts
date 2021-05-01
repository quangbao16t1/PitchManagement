import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ControlModule } from 'src/app/helper/control.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ControlModule,
        ReactiveFormsModule,
        RegisterRoutingModule,
    ],
    declarations: [RegisterComponent],
    providers: []
})
export class RegisterModule { }

