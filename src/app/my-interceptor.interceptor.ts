import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor called"); 
    // if (localStorage.getItem('username')=== null){
    //   this.router.navigateByUrl(''); 
    //   console.log("navigation called")
    //  }else{ 
    //   console.log("navigation not called");
    //  }
    return next.handle(request);
  }

}
