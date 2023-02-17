import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Tasks } from './home/tasklist/Tasks';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private sharedData = new Subject<string>();
  private email = new Subject<string>();
  
  private token = new BehaviorSubject<any>(null);

  setData(data: string) {
    this.sharedData.next(data);
  }

  getData() {
    return this.sharedData.asObservable();
  }

  setEmail(email:string){
    this.email.next(email);
  }
  getEmail(){
    return this.email.asObservable();
  }

  setToken(token:any){
    console.log("tokenn is being set")
    this.token.next(token);
  }
  getToken(){
    return this.token.asObservable();
  }

}
