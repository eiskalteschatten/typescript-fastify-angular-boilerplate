import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRegistration, UserLogin, UserLoginReply, SerializedUser } from '@tfab/shared';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: SerializedUser | null;
  accessToken?: string | null;
  refreshToken?: string | null;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const userStr = localStorage.getItem('user');

    if (userStr) {
      this.user = JSON.parse(userStr);
    }

    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  login(loginData: UserLogin): Observable<UserLoginReply> {
    return this.http.post<UserLoginReply>(`${environment.apiUrl}/api/auth/login`, loginData);
  }

  register(registrationData: UserRegistration): Observable<UserLoginReply> {
    return this.http.post<UserLoginReply>(`${environment.apiUrl}/api/user/register`, { registrationData });
  }

  logout(): void {
    // TODO: need to use the interceptor
    this.http.post(`${environment.apiUrl}/api/auth/logout`, null).subscribe(() => {
      this.user = undefined;
      localStorage.removeItem('user');

      this.accessToken = undefined;
      localStorage.removeItem('accessToken');

      this.refreshToken = undefined;
      localStorage.removeItem('refreshToken');

      this.router.navigate(['/auth/login']);
    });
  }

  setUserAuthData(data: UserLoginReply): void {
    this.user = data.user;
    localStorage.setItem('user', JSON.stringify(data.user));

    this.accessToken = data.accessToken;
    localStorage.setItem('accessToken', data.accessToken);

    this.refreshToken = data.refreshToken;
    localStorage.setItem('refreshToken', data.refreshToken);
  }
}
