import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyTeamComponent } from './my-team.component';

export const routes: Routes = [
    {
        path: '', component: MyTeamComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MyTeamRoutingModule { }
