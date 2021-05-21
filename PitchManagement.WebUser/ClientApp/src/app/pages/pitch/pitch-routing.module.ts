import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PitchComponent } from './pitch.component';
import { ListSubPitchComponent } from './list-sub-pitch/list-sub-pitch.component';
import { OrderPitchComponent } from './order-pitch/order-pitch.component';

export const routes: Routes = [
    {
        path: '', component: PitchComponent,
    },
    {
        path: ':id/sub-pitch', component: ListSubPitchComponent,
    },
    {
        path: ':id/sub-pitch/:spId/order-pitch',  component: OrderPitchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PitchRoutingModule { }
