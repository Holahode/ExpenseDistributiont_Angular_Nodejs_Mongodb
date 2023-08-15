import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from './group.service';

@Component({
  selector: 'app-transaction',
  template: `
  <div id="loginSignUp">

    <h2>Transactions</h2>
    <h4 [ngStyle]="{color: color}"> {{ message }}</h4>
     <form [formGroup]="transactionForm" (ngSubmit)="submitTransaction()" id="loginForm">
        <input type="text" placeholder="title" formControlName="title"> <br>
        <input type="text" placeholder="description" formControlName="description"> <br>
        <input type="text" placeholder="category" formControlName="category"> <br>
        <input type="number" placeholder="amount" formControlName="amount"> <br>
        <input type="date" placeholder="date" formControlName="date"> <br>
        <input type="file"  formControlName="receipt" accept="image/jpg"
          (change)="pickFile($event)"
        > <br> <br>
        <button type="submit" [disabled]="transactionForm.invalid"  class="btn btn-primary">Add Transaction</button>
     </form>

    <a [routerLink]="['', 'users', 'group', group_id, group_name]"
        [ngStyle]="{display: 'flex',  'justify-content': 'end'}"
    >back</a>
    
    </div>
  `,
  styles: [
  ]
})
export class TransactionComponent {
  private activatedRouter = inject(ActivatedRoute);
  private groupService = inject(GroupService);
  receiptFile!: File;
  message: string = '';
  color: string = '';
  group_id = this.activatedRouter.snapshot.paramMap.get('group_id');
  group_name = this.activatedRouter.snapshot.paramMap.get('groupName');

  transactionForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
    description: ['',],
    category: ['', Validators.required],
    amount: ['', Validators.min(0)],
    date: [new Date().toISOString().substring(0, 10)],
    receipt: ['', Validators.required],
  });

  get title() { return this.transactionForm.get('title') as FormControl }
  get description() { return this.transactionForm.get('description') as FormControl }
  get category() { return this.transactionForm.get('category') as FormControl }
  get amount() { return this.transactionForm.get('amount') as FormControl }
  get date() { return this.transactionForm.get('date') as FormControl }
  get receipt() { return this.transactionForm.get('receipt') as FormControl }

  submitTransaction() {
    const formData = new FormData();
    formData.append('title', this.title.value);
    formData.append('description', this.description.value);
    formData.append('category', this.category.value);
    formData.append('amount', this.amount.value);
    formData.append('date', this.date.value);
    formData.append('receipt', this.receiptFile);

    this.groupService.addTransaction(this.group_id as string, formData).subscribe(
      response => {
        if (response.success) {
          this.message = "Transaction submitted successfully";
          this.color = 'green';
          this.title.setValue('');
          this.description.setValue('');
          this.category.setValue('');
          this.amount.setValue('');
          this.date.setValue('');
          this.receipt.setValue('');
        } else {
          this.message = "Unable to add transaction!!";
          this.color = 'red';
        }
      }
    )
  }

  pickFile(event: Event) {
    const input_element = event.target as HTMLInputElement;
    if (input_element.files) {
      this.receiptFile = input_element.files[0];
    }
  }
}
