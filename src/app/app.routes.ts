import { Routes } from '@angular/router';

export const routes: Routes = [
    // TODO: Later on, we should add a wildcard route here,
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full', 
    },
    { path: 'login', loadComponent: () => import('./features/authentication/main-components/authentication-shell/authentication-shell.component').then(c => c.AuthenticationShellComponent)},
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/main-components/dashboard-shell/dashboard-shell.component').then(c => c.DashboardShellComponent) },
];
