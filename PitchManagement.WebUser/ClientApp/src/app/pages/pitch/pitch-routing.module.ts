import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PitchComponent } from './pitch.component';
import { AddPitchComponent } from './add-pitch/add-pitch.component';
import { EditPitchComponent } from './edit-pitch/edit-pitch.component';
import { ListSubPitchComponent } from './list-sub-pitch/list-sub-pitch.component';

export const routes: Routes = [
    {
        path: '', component: PitchComponent,
    },
    {
        path: 'add', component: AddPitchComponent
    },
    {
        path: 'edit/:id', component: EditPitchComponent
    }
    ,
    {
        path: 'sub-pitch/:id', component: ListSubPitchComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PitchRoutingModule { }
