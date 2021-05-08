import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTeamComponent } from './my-team.component';
import { MemberComponent } from './member/member.component';
import { AddMemberComponent } from './member/add-member/add-member.component';

export const routes: Routes = [
    {
        path: '', component: MyTeamComponent,
    },
    {
        path: 'member', component: MemberComponent
    },
    {
        path: 'member/add', component: AddMemberComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MyTeamRoutingModule { }
