import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from './Account';
import { Observable, Subject, Subscription } from 'rxjs';
import { SharedDataService } from './shared-data.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account:Account[]=[];
  subscription: Subscription;
  token:any;

  constructor(private h:HttpClient,private sharedDataService: SharedDataService) { }
  addAccount(account:Account):Observable<any>
  {
//     let username = 'vikas';
//   let password = 'vikas';
// const headers = new HttpHeaders({
//   Authorization: 'Basic ' + btoa(username+":"+password)})
    // let token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthcyIsImV4cCI6MTY3NjY2MDgxOCwiaWF0IjoxNjc2NjI0ODE4fQ.o7xqfvYiYlSWKSLLpBGJWL85yQbsIBPPmSbZmNHUpYQ';
    this.subscription = this.sharedDataService.getToken().subscribe((data) => {
    console.log(data);
    this.token = data;
    })
    const headers = new HttpHeaders({
     Authorization: `Bearer ${this.token}`})
    return this.h.post("http://localhost:8080/account/new-account",account,{headers});
  } 


  // getReferenceNo(referenceNo:string) {
  //   return this.h.get(`http://localhost:8080/process-instance/${referenceNo}`);
  // }

  private taskChanged = new Subject<void>();

  taskChanged$ = this.taskChanged.asObservable();

  notifyTaskChanged() {
    this.taskChanged.next();
  }
}
