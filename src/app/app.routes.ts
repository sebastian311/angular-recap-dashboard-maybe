import { Routes } from '@angular/router';
import { authGuard } from './shared/services/auth.guard';

export const routes: Routes = [
    // TODO: Later on, we should add a wildcard route here,
    { 
        path: '',
        redirectTo: '/login', 
        pathMatch: 'full', 
    },
    { 
        path: 'login',
        loadComponent: () => import('./features/authentication/main-components/authentication-shell/authentication-shell.component').then(c => c.AuthenticationShellComponent),
    },
    { 
        path: 'dashboard', 
        canActivate: [authGuard],
        loadComponent: () => import('./features/dashboard/main-components/dashboard-shell/dashboard-shell.component').then(c => c.DashboardShellComponent),
        loadChildren: () => import('./features/dashboard/routes').then(m => m.dashboardRoutes)
    },
];
