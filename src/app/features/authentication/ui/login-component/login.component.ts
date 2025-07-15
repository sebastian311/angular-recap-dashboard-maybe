import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { AuthStore } from '../../data-access/auth-store';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

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
  
  private authStore = inject(AuthStore);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
  })

  emailErrorMessage = signal('');
  passwordErrorMessage = signal('');
  loginErrorMessage = signal('');
  hide = signal(true);

  showPasswordToggle(e: Event) {
    e.preventDefault();
    this.hide.set(!this.hide());
  }

  onSubmit() {
    const loginResponse = firstValueFrom(this.authStore.login(this.emailControl.value ?? '', this.passwordControl.value ?? ''))
      .then((response) => {
        if (response?.token) {
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((error) => {
        this.loginErrorMessage = error?.error?.message || 'Login failed. Please try again.';
      })
  }
}
