import { Injectable } from '@angular/core';
import { UserRegistration } from '@tfab/shared';

import { LoginModel } from '../../shared/models/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  get isLoggedIn(): boolean {
    return false;
  }

  async login(loginModel: LoginModel): Promise<void> {
    // TODO
    console.log('login goes here', loginModel);
  }

  async register(registrationModel: UserRegistration): Promise<void> {
    // TODO
    console.log('registration goes here', registrationModel);
  }
}
