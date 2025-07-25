import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AuthStore } from './features/authentication/data-access/auth-store';
import { SpinnerComponent } from './shared/components/spinner-component/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, MatSlideToggleModule, SpinnerComponent],
  providers: [AuthStore]
})
export class AppComponent {
  title = 'angular-reboot-dashboard';
}
