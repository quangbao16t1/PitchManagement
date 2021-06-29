import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PitchDetailComponent } from './pitch-detail.component';
import { AddPitchComponent } from './add-pitch/add-pitch.component';
import { EditPitchComponent } from './edit-pitch/edit-pitch.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { SubPitchComponent } from './sub-pitch/sub-pitch.component';
import { AddSubPitchComponent } from './sub-pitch/add-sub-pitch/add-sub-pitch.component';
import { EditSubPitchComponent } from './sub-pitch/edit-sub-pitch/edit-sub-pitch.component';
import { SubPitchDetailComponent } from './sub-pitch-detail/sub-pitch-detail.component';
import { AddSubPitchDetailComponent } from './sub-pitch-detail/add-sub-pitch-detail/add-sub-pitch-detail.component';
import { EidtSubPitchDetailComponent } from './sub-pitch-detail/eidt-sub-pitch-detail/eidt-sub-pitch-detail.component';

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
    },
    {
        path: ':id/sub-pitch', component: SubPitchComponent
    },
    {
        path: ':id/sub-pitch/add', component: AddSubPitchComponent
    },
    {
        path: ':pId/sub-pitch/:spId/edit', component: EditSubPitchComponent
    },
    {
        path: ':pId/sub-pitch/:spId/sub-detail', component: SubPitchDetailComponent
    },
    {
        path: ':pId/sub-pitch/:spId/sub-detail/add', component: AddSubPitchDetailComponent
    },
    {
        path: ':pId/sub-pitch/:spId/sub-detail/:spdId/edit', component: EidtSubPitchDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PitchDetailRoutingModule { }
