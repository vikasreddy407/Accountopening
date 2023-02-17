import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private sharedDataService: SharedDataService) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = {
        username,
        password
    };

    return this.http.post(`http://localhost:8080/engine-rest/identity/verify`, body, { headers });
  }

  fetchProfile(userId: string){
    return this.http.get('http://localhost:8080/engine-rest/user/'+userId+'/profile');
  }

  fetchGroups(userId:string){
    return this.http.get('http://localhost:8080/engine-rest/identity/groups?userId='+userId);
  }
  
}
