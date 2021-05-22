import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PitchDetailComponent } from './pitch-detail.component';
import { AddPitchComponent } from './add-pitch/add-pitch.component';
import { EditPitchComponent } from './edit-pitch/edit-pitch.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';

export const routes: Routes = [
    {
        path: '', component: PitchDetailComponent,
    },
    {
        path: 'add', component: AddPitchComponent
    },
    {
        path: 'edit/:id', component: EditPitchComponent
    },
    {
        path: 'manage-order', component: ManageOrderComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PitchDetailRoutingModule { }
