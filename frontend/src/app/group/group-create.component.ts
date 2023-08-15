import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupService } from './group.service';
import { Router } from '@angular/router';
import { IGroup } from '../users/IUser.interface';

@Component({
  selector: 'app-create-group',
  template: `
  <div id="createForm">  
    <h2>Create Group</h2>

    <h4 [ngStyle]="{ color: color }">{{ message }}</h4>
    <form [formGroup]="titleForm" (ngSubmit)="createGroup()">
      <input type="text" placeholder="Group name" formControlName="groupName" /> <br />
      <button type="submit" [disabled]="titleForm.invalid" class="btn btn-primary">CreateGroup</button>
    </form>
    <a [routerLink]="['', 'users']">back</a>
  </div>

  `,
  styles: [],
})
export class CreateGroupComponent {
  private groupService = inject(GroupService);
  private router = inject(Router);
  message: string = '';
  color: string = "";
  groups: IGroup[] = [];


  titleForm = inject(FormBuilder).nonNullable.group({
    groupName: ['', Validators.required],
  });

  ngOnInit() {
    this.groupService.getGroup().subscribe(
      response => {
        if (response.success) {
          this.groups = response.data
        }
      }
    )
  }

  createGroup() {

    let result = this.groups.find(item => item.title === this.titleForm.get('groupName')?.value)
    if (!result) {
      this.groupService
        .createGroup(this.titleForm.get('groupName')?.value as string)
        .subscribe((response) => {
          if (response.success) {
            this.message = `${this.titleForm.get('groupName')?.value} group created`;
            this.titleForm.get('groupName')?.setValue('');
            this.color = 'green';
          }
        });
    } else {
      this.message = "This group name already exist";
      this.color = "red";
    }
  }

}
