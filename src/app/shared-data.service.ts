import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }
  private sharedData = new Subject<string>();
  private email = new Subject<string>();

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
}
