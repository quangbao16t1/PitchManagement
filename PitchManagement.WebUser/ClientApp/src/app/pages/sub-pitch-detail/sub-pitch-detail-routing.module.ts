import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubPitchDetailComponent } from './sub-pitch-detail.component';
import { AddSubPitchDetailComponent } from './add-sub-pitch-detail/add-sub-pitch-detail.component';
import { EidtSubPitchDetailComponent } from './eidt-sub-pitch-detail/eidt-sub-pitch-detail.component';


export const routes: Routes = [
    {
        path: '', component: SubPitchDetailComponent,
    },
    {
        path: 'add', component: AddSubPitchDetailComponent,
    },
    {
        path: 'edit/:id', component: EidtSubPitchDetailComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SubPitchDetailRoutingModule { }
