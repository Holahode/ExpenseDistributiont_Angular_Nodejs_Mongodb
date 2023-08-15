import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { IDetail, ICreateResponse, IGroupTransactions, IRequest, IGetGroups, IGroupMemberResponse} from '../users/IUser.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);


  createGroup(title: string) {
    return this.http.post<ICreateResponse>(env.SERVER_URL + 'groups', { title: title });
  }

  getGroup() {
    return this.http.get<IGetGroups>(env.SERVER_URL + 'groups');
  }

  addMember(email: string, group_id: string) {
    return this.http.post<{success:boolean, data:boolean}>(env.SERVER_URL + `groups/${group_id}/members`, { email: email });
  }

  getMembers(group_id: string) {
    return this.http.get<IGroupMemberResponse>(env.SERVER_URL + `groups/${group_id}/members`);
  }

  getPendingGroups() {
    return this.http.get<IRequest>(env.SERVER_URL + `groups?pending=true`);
  }
  // http://localhost:3000/groups?pending=true

  updatePendingStatus(group_id: string, user_id: string) {
    return this.http.get<{success:boolean, data:boolean}>(env.SERVER_URL + `groups/${group_id}/members/${user_id}`);
  }

  addTransaction(group_id: string, data: any) {
    return this.http.post<{success:boolean, data:boolean}>(env.SERVER_URL + `groups/${group_id}/transactions`, data);
  }

  getTransaction(group_id: string) {
    return this.http.get<IGroupTransactions>(env.SERVER_URL + `groups/${group_id}/transactions`);
  }

  getTransactionById(group_id: string, transaction_id: string) {
    return this.http.get<IDetail>(env.SERVER_URL + `groups/${group_id}/transactions/${transaction_id}`);
  }

  getTransactionReceipt(transaction_name: string) {
    return this.http.get(env.SERVER_URL + `receipts/${transaction_name}`);
  }
}
