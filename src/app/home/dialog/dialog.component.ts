import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/shared-data.service';
import { UTask } from '../taskdetails/UTask';



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  utask: UTask;
  subscription: Subscription;
  
  constructor(private router:Router,
    private http: HttpClient,
    private sharedDataService: SharedDataService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {action: "", taskId: "", taskName: ""}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
      // this.gettokennn(this.authRequest);
  }


  approveTask(taskId: string, taskName: string) {
    this.utask ={...this.utask, taskStatus:"Approved", taskId: taskId, taskName: taskName};
    this.update(this.utask).subscribe((data)=>{
        console.log(data);
    });
}

rejectTask(taskId: string, taskName: string) {
    this.utask ={...this.utask, taskStatus:"Rejected" , taskId: taskId, taskName: taskName};
    this.update(this.utask).subscribe((data)=>{
        console.log(data);
    });
}
token:any;

update(utask : UTask | undefined) {
//   let username = 'vikas';
//   let password = 'vikas';
// const headers = new HttpHeaders({
//   Authorization: 'Basic ' + btoa(username+":"+password)})
// let token ='';
  //  console.log(this.token);
   this.subscription = this.sharedDataService.getToken().subscribe((data) => {
    this.token = data;
    console.log(this.token);
    })
  const headers = new HttpHeaders({
  Authorization: `Bearer ${this.token}`})
    return this.http.put("http://localhost:8080/account/updateTaskStatus", utask,{headers,responseType:'text'});
}

// authRequest:any={
//   "userName":"vikas",
//   "password":"vikas"
// }

// gettokennn(authRequest){
//   this.getToken(authRequest).subscribe(data => {
//     this.sharedDataService.setToken(data);
//     this.token = data;
//      console.log(data);
//   })
// }

// getToken(request){
//  return this.http.post("http://localhost:8080/account/authenticate",request,{responseType:'text' as 'json'});
// }


confirmAction(taskId: string, taskName: string, action: string) {
    if (action === "Approve") {
        this.approveTask(taskId, taskName);    
    } else if (action === "Reject") {
        this.rejectTask(taskId, taskName);
    }
    this.dialogRef.close(true);   
}
}
