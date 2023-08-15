import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './group-create.component';
import { RequestComponent } from './group-request.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ListGroupComponent } from './group-list.component';
import { TransactionComponent } from './group-transaction.component';
import { GroupDetailsComponent } from './group-details.component';
import { ErrorPageComponent } from '../error-page.component';


@NgModule({
  declarations: [
    CreateGroupComponent,
    RequestComponent,
    ListGroupComponent,
    TransactionComponent,
    GroupDetailsComponent,
  ],
  imports: [ CommonModule, ReactiveFormsModule, RouterModule.forChild([
    
    {path:'creategroup', component:CreateGroupComponent},
    {path:'requests', component:RequestComponent},
    {path:':group_id/:groupName', component:ListGroupComponent},
    {path:':group_id/:groupName/transaction', component:TransactionComponent},
    {path:':group_id/:groupName/transaction/:transaction_id', component:GroupDetailsComponent},
    
    {path:'**', component:ErrorPageComponent},
  ])
  ]
})
export class GroupModule { }
