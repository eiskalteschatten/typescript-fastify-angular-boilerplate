import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
