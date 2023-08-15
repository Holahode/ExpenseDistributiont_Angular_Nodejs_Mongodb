import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { checkTokenGuard } from '../auth/check-token.guard';
import {ErrorPageComponent} from '../error-page.component'

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: UserListComponent,  pathMatch: 'full' },
      {
        path: 'group',
        loadChildren: () =>
          import('../group/group.module').then((module) => module.GroupModule),
        canActivate: [checkTokenGuard],
      },
      {path:'**', component:ErrorPageComponent},
    ]),
  ],
})
export class UsersModule {}
