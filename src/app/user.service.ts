import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

interface myData {
  message: string,
  success: boolean
}

interface isLoggedIn {
  status: boolean
}

interface logoutStatus {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getSomeData() {
    return true; // this.http.get<myData>('/api/database.php')
  }

  // isLoggedIn() : Observable<isLoggedIn> {
  //   return this.http.get<isLoggedIn>('/api/isloggedin.php')
  // }

  isLoggedIn(username, password)  : Observable<any> {
    // post these details to API server return user info if correct
    return this.http.post("http://192.168.1.127:5000/auth" || "/api/auth", {  username, password  });
  }

  logout() {
    return true;  //this.http.get<logoutStatus>('/api/logout.php')
  }

  
}
