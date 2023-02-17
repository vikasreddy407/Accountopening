import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../login.service';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string;
  password: string;
  email: string;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService,
    private router:Router
  ) {}

  ngOnInit(): void {
    //  this.gettokennn(this.authRequest);
  }

  login() {
    this.loginService.login(this.username, this.password).subscribe(
      (data) => {
        const authenticated = data['authenticated'];
        if (authenticated != true) {
          this.showError('User Not Found');
        } else {
          this.showSucess('Logging Sucessfull');
          this.loginService.fetchProfile(this.username).subscribe((data) => {
            console.log(data);
            this.sharedDataService.setEmail(data['email']);
            this.sharedDataService.setData(data['firstName']+" "+data['lastName']);
            sessionStorage.setItem('username', data['firstName']);
          });
          this.loginService.fetchGroups(this.username).subscribe((data) => {
            console.log(data);
          });
          this.router.navigate(['/home/workitems']);
        }
        console.log(data);
      },
      ({ error }) => {
        console.log(error);
        console.log(error.message);
        this.showError(error.message);
      }
    );
  }

  showError(msg: string) {
    this.toastr.error(msg, 'Error');
  }

  showSucess(msg: string) {
    this.toastr.success(msg, 'Sucess');
  }

  reset() {
    this.username = '';
    this.password = '';
  }

  // authRequest:any={
  //   "userName":"vikas",
  //   "password":"vikas"
  // }
  // // token: any;
  // gettokennn(authRequest){
  //   this.getToken(authRequest).subscribe(data => {
  //     this.sharedDataService.setToken(data);
  //     // this.token = data;
  //      console.log(data);
  //   })
  // }
  
  // getToken(request){
  //  return this.http.post("http://localhost:8080/account/authenticate",request,{responseType:'text' as 'json'});
  // }
}
