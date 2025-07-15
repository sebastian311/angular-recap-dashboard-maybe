import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { tapResponse } from '@ngrx/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { pipe, switchMap, tap } from 'rxjs';
import { GenericAuthenticationResponse } from '../../../shared/models/GenericReponses.model';
import { HttpErrorResponse } from '@angular/common/http';

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
  withMethods((state, authService = inject(AuthService)) => ({
    login: (username: string, password: string) =>
      authService.signIn({ username, password }).pipe(
        tap(() => patchState(state, { isLoading: true })),
        tapResponse({
          next: (response: GenericAuthenticationResponse) => {
            patchState(state, {
              token: response?.token,
              isLoading: false,
            });
          },
          error: (error: HttpErrorResponse) => {
            console.error('Login failed: ', error);
            patchState(state, { isLoading: false });
          },
        })
      ),
  }))
);
