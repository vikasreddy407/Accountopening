import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tasks } from './home/tasklist/Tasks';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private sharedData = new Subject<string>();
  private email = new Subject<string>();
  private token = new Subject<any>();

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
    console.log(this.getEmail());
  }
  getToken(){
    return this.token.asObservable();
  }

}
