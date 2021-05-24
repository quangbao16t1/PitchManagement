import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCatchComponent } from './list-catch.component';


const routes: Routes = [
    { path: '', component: ListCatchComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListCatchRoutingModule { }
