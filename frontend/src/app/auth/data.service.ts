import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import {
  ILogin,
  INITIAL_STATE_VALUE,
  IResponse,
  ISingUp,
  IState,
} from '../users/IUser.interface';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  state = signal<IState>(INITIAL_STATE_VALUE);

  signup(signupData: ISingUp) {
    return this.http.post<IResponse>(env.SERVER_URL + 'users/signup', signupData);
  }

  login(loginData: ILogin) {
    return this.http.post<IResponse>(env.SERVER_URL + 'users/signin/',loginData);
  }
}
