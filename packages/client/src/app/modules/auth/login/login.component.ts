import { Component } from '@angular/core';

import { LoginModel } from '../../../shared/models/login-model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model = new LoginModel();

  constructor(
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.login(this.model);
  }
}
