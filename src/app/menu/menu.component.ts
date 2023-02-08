import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  
  // email: string;
  // subscription: Subscription;

  
  // constructor(private sharedDataService: SharedDataService) 
  // {}
  // ngOnInit(): void {
  //   this.subscription = this.sharedDataService.getEmail().subscribe((data) => {
  //     this.email = data;
  //   });
  // }
}
