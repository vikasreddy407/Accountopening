import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Taskdetails } from '../taskdetails/Taskdetails';
import { UTask } from '../update/UTask';

@Component({
  selector: 'app-frontdesk',
  templateUrl: './frontdesk.component.html',
  styleUrls: ['./frontdesk.component.css']
})
export class FrontdeskComponent implements OnInit {
  tasks:Taskdetails;
  utask: UTask;
  msg: string;
  constructor(private http: HttpClient,
    public router: Router,
    public activatedRoute:ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({taskid}) => { 
      this.getTaskbyId(taskid).subscribe((data)=>{this.tasks=data})
    })
  }
  getTaskbyId(id:string): Observable<any>{
    return this.http.get("http://localhost:8080/engine-rest/task/"+id);
   }

   updateTask(form: NgForm){
    console.log(form.value);
     this.utask ={...this.utask, ...form.value};
     this.update(this.utask).subscribe((data)=>{
      console.log(this.utask);
     })
   }
   updateSel(value:string){
    this.utask ={...this.utask, taskStatus:value}
   }
   update(utask : UTask | undefined){
    return this.http.put("http://localhost:8080/account/updateVariable", utask,{responseType:'text'});
   }
}
