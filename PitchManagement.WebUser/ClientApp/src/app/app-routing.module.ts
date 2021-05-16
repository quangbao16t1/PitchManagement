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
          path: 'register',
          loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
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
        },
        {
          path: 'sub-pitch',
          loadChildren: () => import('./pages/sub-pitch/sub-pitch.module').then(m => m.SubPitchModule)
        },
        {
          path: 'pitch-detail',
          loadChildren: () => import('./pages/pitch-detail/pitch-detail.module').then(m => m.PitchDetailModule)
        },
        {
          path: 'user-profile',
          loadChildren: () => import('./pages/user-profile/user-profile.module').then(m => m.UserProfileModule)
        },
        {
          path: 'list-match',
          loadChildren: () => import('./pages/list-match/list-match.module').then(m => m.ListMatchModule)
        },
        {
          path: 'create-match',
          loadChildren: () => import('./pages/create-match/create-match.module').then(m => m.CreateMatchModule)
        },
        {
          path: 'list-catch',
          loadChildren: () => import('./pages/list-catch/list-catch.module').then(m => m.ListCatchModule)
        },
        {
          path: 'find-match',
          loadChildren: () => import('./pages/find-match/find-match.module').then(m => m.FindMatchModule)
        },
        {
          path: 'invite-match',
          loadChildren: () => import('./pages/invite-match/invite-match.module').then(m => m.InviteMatchModule)
        }
      ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
    @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
