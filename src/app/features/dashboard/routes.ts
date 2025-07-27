import { Routes } from '@angular/router';
import { TestComponent } from './ui/test/test.component';

export const dashboardRoutes: Routes = [
  // Make sure to lazy load components
  {
    path: 'test',
    component: TestComponent, // Sample component for testing purposes
  },
];
