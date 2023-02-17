import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './Account';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account:Account[]=[];
  constructor(private h:HttpClient) { }
  addAccount(account:Account):Observable<any>
  {
//     let username = 'vikas';
//   let password = 'vikas';
// const headers = new HttpHeaders({
//   Authorization: 'Basic ' + btoa(username+":"+password)})
  let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthcyIsImV4cCI6MTY3NjY0Nzc1OSwiaWF0IjoxNjc2NjExNzU5fQ.Z1uCk6XOUQS9_YRjtGOw_TRx7tRAEdQYXnJBebKbcqs';
const headers = new HttpHeaders({
  Authorization: `Bearer ${token}`})
   return this.h.post("http://localhost:8080/account/new-account",account,{headers});
  }
  getReferenceNo(referenceNo:string) {
    return this.h.get(`http://localhost:8080/process-instance/${referenceNo}`);
  }

  private taskChanged = new Subject<void>();

  taskChanged$ = this.taskChanged.asObservable();

  notifyTaskChanged() {
    this.taskChanged.next();
  }
}
