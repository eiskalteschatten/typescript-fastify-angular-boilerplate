import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegistration, UserLogin, UserLoginReply, SerializedUser } from '@tfab/shared';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: SerializedUser;
  accessToken?: string;
  refreshToken?: string;

  constructor(
    private http: HttpClient,
  ) { }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  login(loginData: UserLogin): void {
    // TODO
    console.log('login goes here', loginData);
  }

  register(registrationData: UserRegistration): Observable<UserLoginReply> {
    return this.http.post<UserLoginReply>(`${environment.apiUrl}/api/user/register`, { registrationData });
  }

  setUserAuthData(data: UserLoginReply): void {
    this.user = data.user;
    this.accessToken = data.accessToken;
    this.refreshToken = data.refreshToken;
  }
}
