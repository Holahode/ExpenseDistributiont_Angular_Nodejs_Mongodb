import { Component, inject } from '@angular/core';
import { GroupService } from './group.service';
import { DataService } from '../auth/data.service';
import { IGroup } from '../users/IUser.interface';

@Component({
  selector: 'app-group-data',
  template: `

    <h2>Requests</h2>
    <table>
      <thead>
        <tr>
          <th>Invited Group</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let each of requests">
          <td> {{ each.title }} </td>
          <td>
            <button (click)="acceptRequest(each._id)"
            class="btn btn-success"
            [ngStyle]="{width:'100%'}"
            >accept request</button></td>
        </tr>
      </tbody>
    </table>
    <a [routerLink]="['', 'users']"
      [ngStyle]="{display: 'flex',  'justify-content': 'center', 'margin':'3%', 'margin-bottom':'20%'}"
    >back</a>

  `,
  styles: [],
})
export class RequestComponent {
  private groupService = inject(GroupService);
  private dataService = inject(DataService);
  user_id : string =  this.dataService.state()._id;
  requests: IGroup[] = [];

  pending(){
    this.groupService.getPendingGroups().subscribe((response) => {
      if (response.success) {
        this.requests = response.data;
      }
    });
  }

  ngOnInit() {
    this.pending();
  }

  acceptRequest(group_id: string){
    this.groupService.updatePendingStatus(group_id, this.user_id).subscribe(
      response=>{
        if(response.success){
          this.pending();
        }
      }
    )
  }
}
