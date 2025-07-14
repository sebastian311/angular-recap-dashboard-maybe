import { Component, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../../shared/services/auth.service';
import { UserModel } from '../../../../shared/models/User.model';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  readonly passwordControl = new FormControl('', [Validators.required, /*Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')*/]); // TODO: Uncomment pattern validation later

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  hide = signal(true);

  constructor(private authService: AuthService) {}

  showPasswordToggle(e: Event) {
    e.preventDefault();
    this.hide.set(!this.hide());
  }

  onSubmit() {
    const body: UserModel = {
      username: this.emailControl.value ?? '',
      password: this.passwordControl.value ?? ''
    };

    this.authService.signIn(body).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
}
