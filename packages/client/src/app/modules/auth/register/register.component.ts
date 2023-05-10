import { Component } from '@angular/core';

import { RegistrationModel } from '../../../shared/models/registration-model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model = new RegistrationModel();

  constructor(
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.register(this.model);
  }
}
