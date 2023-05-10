import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
    }, {
      validators: this.checkIfPasswordsMatch
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
    if (this.registrationForm.valid) {
      this.authService.register({
        email: this.email?.value,
        firstName: this.firstName?.value,
        lastName: this.lastName?.value,
        password: this.password?.value,
      });
    }
  }

  private checkIfPasswordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value === confirmPassword.value
      ? null
      : { passwordsDoNotMatch: true };
  }
}
