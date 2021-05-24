import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMatchComponent } from './list-match.component';


const routes: Routes = [
    { path: '', component: ListMatchComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListMatchRoutingModule { }
