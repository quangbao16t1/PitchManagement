import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlModule } from 'src/app/helper/control.module';
import { MyTeamComponent } from './my-team.component';
import { MyTeamRoutingModule } from './my-team-routing.module';
import { MemberComponent } from './member/member.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MemberInfoComponent } from './member/member-info/member-info.component';
import { CreateTeamComponent } from './create-team/create-team.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ControlModule,
        NgxPaginationModule,
        MyTeamRoutingModule,
        NgbModule,
        BsDatepickerModule.forRoot()
    ],
    declarations: [
        MyTeamComponent,
        MemberComponent,
        UpdateTeamComponent,
        MenuTopComponent,
        MenuLeftComponent,
        MemberInfoComponent,
        CreateTeamComponent
    ]
})
export class MyTeamModule { }
