import { Routes } from '@angular/router';
import { AuthenticationShellComponent } from './features/authentication/main-components/authentication-shell/authentication-shell.component';

export const routes: Routes = [
    // TODO: Later on, we should add a wildcard route here,
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full', 
        loadComponent: () => import('./features/authentication/main-components/authentication-shell/authentication-shell.component').then(c => c.AuthenticationShellComponent)},
    { path: '/home', }
];
