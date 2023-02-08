import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Account';
  
  constructor() { }
  ngOnInit()
  {
     window.addEventListener('unload', (event) =>
      { 
        localStorage.removeItem('username');
      });
    }
}
