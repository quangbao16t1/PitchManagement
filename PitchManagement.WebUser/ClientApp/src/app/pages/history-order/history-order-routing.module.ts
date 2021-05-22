import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HistoryOrderComponent } from './history-order.component';

export const routes: Routes = [
    {
        path: '', component: HistoryOrderComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HistoryOrderRoutingModule { }
