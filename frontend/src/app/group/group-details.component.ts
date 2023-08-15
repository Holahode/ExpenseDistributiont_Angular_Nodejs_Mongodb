import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './group.service';
import { INITIAL_TRANSACTION, ITransaction } from '../users/IUser.interface';

@Component({
  selector: 'app-group-details',
  template: `
  <div>
    <h2>Transactions</h2>

    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Paid by</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount paid</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td>{{ individualTransaction.title }}</td>
          <td>{{ individualTransaction.paid_by.fullname }}</td>
          <td>{{ individualTransaction.description }}</td>
          <td>{{ individualTransaction.category }}</td>
          <td>{{ individualTransaction.amount }}</td>
          <td>{{ individualTransaction.date | date }}</td>
        </tr>
      </tbody>
    </table> <br>

    <div [ngStyle]="{'display':'flex','justify-content':'center'}">
      <img  *ngIf="found" src="http://localhost:3000/receipts/{{fileName}}" alt="not provided">
    </div>
    

    <br>

    <div [ngStyle]="{'display':'flex','justify-content':'end', 'margin-right':'10%'}">
        <a [routerLink]="['', 'users', 'group', group_id, group_name ]">back</a>
    </div>
    
  </div>
  `,
  styles: [],
})
export class GroupDetailsComponent {
  private activatedRouter = inject(ActivatedRoute);
  private groupService = inject(GroupService);
  individualTransaction: ITransaction = INITIAL_TRANSACTION;
  found: boolean = false;
  fileName: string = '';
  totalExpense: number = 0;

  group_id: string = this.activatedRouter.snapshot.paramMap.get('group_id') as string;
  transaction_id: string = this.activatedRouter.snapshot.paramMap.get('transaction_id') as string;
  group_name: string = this.activatedRouter.snapshot.paramMap.get('groupName') as string;

  ngOnInit() {
    this.groupService.getTransactionById(this.group_id, this.transaction_id).subscribe(
      response => {
        if (response.success) {
          this.individualTransaction = response.data;
          this.fileName = this.individualTransaction.receipt.filename;
          this.found = true
        }
      }
    );


  }

}
