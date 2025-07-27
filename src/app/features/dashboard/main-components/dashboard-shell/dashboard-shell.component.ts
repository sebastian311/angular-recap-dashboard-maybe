import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.scss'
})
export class DashboardShellComponent {
  private router = inject(Router);

  navigateToTest() {
    this.router.navigate(['/dashboard/test']);
  }
}
