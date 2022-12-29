import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginPageModule } from './pages/login/login.module';
import { AuthGuard } from './_guards/auth.guard';
import { NoAuthGuard } from './_guards/no-auth.guard';

export const AppRoutes: Routes = [
  {
    path: '/login',
    // canActivate: [NoAuthGuard],
    component: LoginPageModule
  }, 
  {
    path: '',
    // canActivate: [AuthGuard],
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x => x.AdminLayoutModule)
      }]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
]
