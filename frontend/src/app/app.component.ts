import { Component, inject } from '@angular/core';
import { DataService } from './auth/data.service';
import { Router } from '@angular/router';
import { INITIAL_STATE_VALUE } from './users/IUser.interface';

@Component({
  selector: 'app-root',
  template: `

    <nav *ngIf="isLoggedIn">
      <a [routerLink]="['', 'users']" [ngStyle]="{color:'#fff'}">Home</a>
      <button (click)="logout()" class="btn btn-danger"> Logout </button>
    </nav>

    <router-outlet />

<footer class="text-center text-white" style="background-color: #0a4275;">

      <span class="d-flex justify-content-center align-items-center"></span>
 
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    © 2023 Copyright: Gemechu Tiko & Michael Abayneh
  </div>

</footer>


  `,
  styles: []
})
export class AppComponent {
  dataService = inject(DataService);
  router = inject(Router);
  isLoggedIn : boolean = false;
  
  ngDoCheck(){
    if(this.dataService.state().token){
      this.isLoggedIn = true;
    }
  }

  logout(){
    this.isLoggedIn = false;
    this.dataService.state.set(INITIAL_STATE_VALUE);
    this.router.navigate(['', 'login']);
    localStorage.clear();
  }


}
