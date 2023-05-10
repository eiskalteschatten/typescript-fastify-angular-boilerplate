import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordRegex } from '@tfab/shared';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup = new FormGroup([]);

  ngOnInit() {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(passwordRegex)
      ]),
      confirmPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.pattern(passwordRegex)
      ]),
    });
  }

  constructor(
    private authService: AuthService
  ) {}

  get email() { return this.registrationForm.get('email'); }
  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  onSubmit() {
    this.authService.register({
      email: this.email?.value,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      password: this.password?.value,
    });
  }
}
