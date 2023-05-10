import { Injectable } from '@angular/core';
import { UserRegistration, UserLogin } from '@tfab/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  get isLoggedIn(): boolean {
    return false;
  }

  async login(loginModel: UserLogin): Promise<void> {
    // TODO
    console.log('login goes here', loginModel);
  }

  async register(registrationModel: UserRegistration): Promise<void> {
    // TODO
    console.log('registration goes here', registrationModel);
  }
}
