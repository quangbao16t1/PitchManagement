import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ManageOrderComponent } from './manage-order.component';

export const routes: Routes = [
    {
        path: '', component: ManageOrderComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ManageOrderRoutingModule { }
