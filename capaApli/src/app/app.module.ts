import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { GerenteLayoutComponent } from './layouts/gerente-layout/gerente-layout.component';
import { EncargadoLayoutComponent } from './layouts/encargado-layout/encargado-layout.component';

// Importa y alias cada dashboard
import { DashboardComponent as AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { DashboardComponent as GerenteDashboardComponent } from './pages/gerente/dashboard/dashboard.component';
import { DashboardComponent as EncargadoDashboardComponent } from './pages/encargado/dashboard/dashboard.component';

// Importa las nuevas funcionalidades
import { UserRegistrationComponent } from './pages/admin/user-registration/user-registration.component';
import { RoleManagementComponent } from './pages/admin/role-management/role-management.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    GerenteLayoutComponent,
    EncargadoLayoutComponent,
    AdminDashboardComponent,
    GerenteDashboardComponent,
    EncargadoDashboardComponent,
    UserRegistrationComponent,
    RoleManagementComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
