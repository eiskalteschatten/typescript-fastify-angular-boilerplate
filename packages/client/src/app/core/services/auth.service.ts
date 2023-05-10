import { Injectable } from '@angular/core';

import { LoginModel } from '../../shared/models/login-model';
import { RegistrationModel } from '../../shared/models/registration-model';

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

  async register(registrationModel: RegistrationModel): Promise<void> {
    // TODO
    console.log('registration goes here', registrationModel);
  }
}
