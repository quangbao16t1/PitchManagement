import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PitchDetailComponent } from './pitch-detail.component';

export const routes: Routes = [
    {
        path: '', component: PitchDetailComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PitchDetailRoutingModule { }
