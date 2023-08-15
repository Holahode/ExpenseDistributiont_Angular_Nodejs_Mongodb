import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './auth/data.service';
import { ISingUp } from './users/IUser.interface';
@Component({
  selector: 'app-signup',
  template: `
  <div id="loginSignUp">
    <h2 [ngStyle]="{'display':'flex','justify-content':'center'}">SignUp</h2>
    <marquee><h4 [ngStyle]="{ color: 'red' }">{{ message }}</h4></marquee>
    <form [formGroup]="signupForm" (ngSubmit)="signup()" id="loginForm">
      <input type="text" placeholder="Full-name" formControlName="fullname" />
      <br />
      <input type="email" placeholder="Email" formControlName="email" /> <br />
      <input
        type="password"
        placeholder="Password"
        formControlName="password"
      />
      <br />
      <button type="submit" class="btn btn-primary">Signup</button>
    </form>
    <p style="display: flex; flex-direction: column; align-items: center;">
      <a [routerLink]="['', 'login']">Already have account</a>
    </p>
    </div>
  `,
  styles: [],
})
export class SignupComponent {
  message: string = '';
  private router = inject(Router);
  private userData = inject(DataService);
  signupForm = inject(FormBuilder).nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signup() {
    this.userData
      .signup(this.signupForm.value as ISingUp)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['', 'login']);
        } else {
          this.message = response.data;
        }
      });
  }
}
