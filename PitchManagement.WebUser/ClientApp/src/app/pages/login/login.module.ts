import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        LoginRoutingModule,
    ],
    declarations: [LoginComponent],
    providers: []
})
export class LoginModule { }

