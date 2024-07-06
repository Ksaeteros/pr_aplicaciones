import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GerenteLayoutComponent } from './layouts/gerente-layout/gerente-layout.component';
import { EncargadoLayoutComponent } from './layouts/encargado-layout/encargado-layout.component';
import { AuthGuard } from './guards/auth.guard';

// Importa y alias cada dashboard
import { DashboardComponent as AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DashboardComponent as GerenteDashboardComponent } from './pages/gerente/dashboard/dashboard.component';
import { DashboardComponent as EncargadoDashboardComponent } from './pages/encargado/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: AdminDashboardComponent }]
  },
  {
    path: 'gerente',
    component: GerenteLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: GerenteDashboardComponent }]
  },
  {
    path: 'encargado',
    component: EncargadoLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: EncargadoDashboardComponent }]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
