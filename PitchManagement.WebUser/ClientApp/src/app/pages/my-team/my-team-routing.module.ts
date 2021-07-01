import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTeamComponent } from './my-team.component';
import { MemberComponent } from './member/member.component';
import { UpdateTeamComponent } from './update-team/update-team.component';
import { MemberInfoComponent } from './member/member-info/member-info.component';
import { CreateTeamComponent } from './create-team/create-team.component';

export const routes: Routes = [
    {
        path: '', component: MyTeamComponent,
    },
    {
        path: ':pId/member', component: MemberComponent
    },
    {
        path: ':pId/update-team', component: UpdateTeamComponent
    },
    {
        path: ':pId/member/:userId/member-info', component: MemberInfoComponent
    },
    {
        path: 'add', component: CreateTeamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MyTeamRoutingModule { }
