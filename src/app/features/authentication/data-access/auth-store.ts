import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
    patchState,
    signalStore,
    withComputed,
    withMethods,
    withState,
} from '@ngrx/signals';
import { delay, tap } from 'rxjs';
import { GenericAuthenticationResponse } from '../../../shared/models/GenericReponses.model';
import { AuthService } from '../../../shared/services/auth.service';
import { GlobalSpinnerService } from '../../../shared/services/global-spinner.service';

type AuthState = {
  token: string;
  isLoading: boolean;
};

const initialState: AuthState = {
  token: '',
  isLoading: false,
};

export const AuthStore = signalStore(
  withState<AuthState>(initialState),
  withComputed((state) => ({
    isAuthenticated: computed(() => state.token() !== ''),
  })),
  withMethods((state, authService = inject(AuthService), globalSpinner = inject(GlobalSpinnerService)) => ({
    login: (username: string, password: string) =>
      authService.signIn({ username, password }).pipe(
        tap(() => {
          patchState(state, { isLoading: true });
          globalSpinner.showSpinner();
        }),
        tapResponse({
          next: (response: GenericAuthenticationResponse) => {
            globalSpinner.hideSpinner();

            patchState(state, {
              token: response?.token,
              isLoading: false,
            });
          },
          error: (error: HttpErrorResponse) => {
            console.error('Login failed: ', error);
            globalSpinner.hideSpinner();
            patchState(state, { isLoading: false });
          },
        })
      ),
  }))
);
