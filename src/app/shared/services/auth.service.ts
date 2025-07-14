import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GenericAuthenticationResponse, GenericStringMessageResponse } from '../models/GenericReponses.model';
import { UserModel } from '../models/User.model';

import { environment } from '../../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    // Maybe sign-up should be in a separate service, like a keycloak service

    signIn(body: UserModel): Observable<GenericAuthenticationResponse> {
        return this.http.post<GenericAuthenticationResponse>(`${environment.port}api/sign-in`, body).pipe(
            tap((response: GenericAuthenticationResponse) => {
                if (response.token) {
                    this.setToken(response.token);
                }
            })
        );
    }

    logOut(): Observable<GenericStringMessageResponse> {
        return this.http.post<GenericStringMessageResponse>(`${environment.port}api/sign-in`, {});
    }

    setToken(token: string): void {
        localStorage.setItem('Session Token', token);
    }

    getAuthToken(): string | null {
        return localStorage.getItem('Session Token');
    }
}