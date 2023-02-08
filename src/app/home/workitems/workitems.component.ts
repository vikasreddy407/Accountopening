import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/shared-data.service';
import { Task } from '../taskdetails/Task';
import { Taskdetails } from '../taskdetails/Taskdetails';
import { Tasks } from '../tasklist/Tasks';
import { userData } from './userData';

@Component({
  selector: 'app-workitems',
  templateUrl: './workitems.component.html',
  styleUrls: ['./workitems.component.css']
})
export class WorkitemsComponent {
  
  displayedColumns:string[]=['id','name','created','assigned']
  dataSource:any=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  userdata:userData;
  email: string;
  subscription: Subscription;

  // tasks:Taskdetails;
  tasks:Tasks[]=[];
  constructor(private http: HttpClient,private route: ActivatedRoute,private sharedDataService: SharedDataService) 
  {}

ngOnInit(): void {
  let assignedTask:any[]=[];
  this.subscription = this.sharedDataService.getEmail().subscribe((data) => {
    this.email = data;
    this.getTasksByAssignee().subscribe((data) => {
      this.tasks = data;
      console.log(data);
      this.dataSource=new MatTableDataSource<Tasks>(data);
      this.dataSource.paginator=this.paginator;
    });
  });
}


getTasksByAssignee(): Observable<any> {
  return this.http.get(
    `http://localhost:8080/engine-rest/task?assignee=` + this.email
  );
}
}