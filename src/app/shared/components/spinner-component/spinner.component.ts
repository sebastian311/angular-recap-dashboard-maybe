import { Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GlobalSpinnerService } from '../../services/global-spinner.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-spinner-component',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  private globalSpinnerService = inject(GlobalSpinnerService);

  spinnerState = toSignal(this.globalSpinnerService.getSpinnerState());
}
