import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginReply } from '@tfab/shared';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup = new FormGroup([]);

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.authService.login({
        email: this.email?.value,
        password: this.password?.value,
      }).subscribe((reply: UserLoginReply) => {
        this.authService.setUserAuthData(reply);
        this.isLoading = false;
        this.router.navigate(['/']);
      });;
    }
  }
}
