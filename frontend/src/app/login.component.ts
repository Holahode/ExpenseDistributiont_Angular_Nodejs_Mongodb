import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from './auth/data.service';
import { ILogin, INITIAL_STATE_VALUE, IState } from './users/IUser.interface';
import jwt_decode from 'jwt-decode';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-signin',
  template: `
  <div id="loginSignUp">
    <h2> Login</h2>
    <marquee><h4 [ngStyle]="{ color: 'red' }">{{ message }}</h4></marquee>
    <form [formGroup]="loginForm" (ngSubmit)="login()" id="loginForm">
      <input type="email" placeholder="email" formControlName="email" /> <br />
      <input type="password" placeholder="password" formControlName="password" /> <br />
      <button type="submit" class="btn btn-primary" >Login</button>
    </form>
    <p style="display: flex; flex-direction: column; align-items: center;">
      <a [routerLink]="['', 'signup']">Create new account</a>
    </p>
    </div>
  `,
  styles: [],
})
export class LoginComponent {
  private router = inject(Router);
  private dataService = inject(DataService);
  message: string = '';

  loginForm = inject(FormBuilder).nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  login() {
    this.dataService
      .login(this.loginForm.value as ILogin)
      .subscribe((response) => {
        if (response.success) {
          this.router.navigate(['', 'users']);
          localStorage.setItem(env.KEY, JSON.stringify(response.data));
          const stateTemp: IState = {
            ...jwt_decode(response.data),
            token: response.data,
          };
          this.dataService.state.set(stateTemp);
        } else {
          this.message = response.data;
        }
      });
  }
}
