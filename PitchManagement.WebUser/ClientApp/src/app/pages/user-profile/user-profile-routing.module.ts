import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { EditUserProflieComponent } from './edit-user-proflie/edit-user-proflie.component';

export const routes: Routes = [
    {
        path: '', component: UserProfileComponent,
    },
    {
        path: 'edit/:id', component: EditUserProflieComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserProFileRoutingModule { }
