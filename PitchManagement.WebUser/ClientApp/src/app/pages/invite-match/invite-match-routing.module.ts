import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InviteMatchComponent } from './invite-match.component';


const routes: Routes = [
    { path: '', component: InviteMatchComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InviteMatchRoutingModule { }
