import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: '',
      children: [
        {
          path: 'home',
          loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
        },
        {
          path: 'login',
          loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
        },
        {
          path: 'pitch',
          loadChildren: () => import('./pages/pitch/pitch.module').then(m => m.PitchModule)
        },
        {
          path: 'team',
          loadChildren: () => import('./pages/my-team/my-team.module').then(m => m.MyTeamModule)
        },
        {
          path: 'users',
          loadChildren: () => import('./pages/user-management/user-management.module').then(m => m.UserManagementModule)
        }
      ]
    },
    // {
    //     path: '**',
    //     redirectTo: 'login'
    // }
];
    @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
