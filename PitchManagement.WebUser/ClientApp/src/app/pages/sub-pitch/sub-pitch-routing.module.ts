import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubPitchComponent } from './sub-pitch.component';
import { AddSubPitchComponent } from './add-sub-pitch/add-sub-pitch.component';
import { EditSubPitchComponent } from './edit-sub-pitch/edit-sub-pitch.component';


export const routes: Routes = [
    {
        path: '', component: SubPitchComponent,
    },
    {
        path: 'add', component: AddSubPitchComponent
    },
    {
        path: 'edit/:id', component: EditSubPitchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SubPitchRoutingModule { }
