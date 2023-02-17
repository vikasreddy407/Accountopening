import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from 'src/app/Account';
import { AccountService } from 'src/app/account.service';
import { SharedDataService } from 'src/app/shared-data.service';

@Component({
  selector: 'app-newform',
  templateUrl: './newform.component.html',
  styleUrls: ['./newform.component.css']
})
export class NewformComponent implements OnInit {
  account:Account=new Account();
  referenceNo:string;
  
  constructor(private s:AccountService,private router:Router,private sharedDataService: SharedDataService) { 
  }
  subscription: Subscription;
  ngOnInit():void{
  }
  addAccount():void{  
    this.subscription = this.sharedDataService.getToken().subscribe((data) => {
      console.log(data);
      // this.token = data;
      })
    this.s.addAccount(this.account).subscribe((data: any) => {
    this.referenceNo = data.referenceNo;
    this.router.navigate(['/home/confirm', this.referenceNo]);
  });
}
}



 