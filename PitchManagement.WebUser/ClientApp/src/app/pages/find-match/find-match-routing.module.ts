import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindMatchComponent } from './find-match.component';


const routes: Routes = [
    { path: '', component: FindMatchComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FindMatchRoutingModule { }
