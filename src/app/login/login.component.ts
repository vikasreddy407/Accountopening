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

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService,
    private sharedDataService: SharedDataService,
    private router:Router
  ) {}

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
            // this.sharedDataService.setData(this.username);
            this.sharedDataService.setData(data['firstName']+" "+data['lastName']);
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
}
