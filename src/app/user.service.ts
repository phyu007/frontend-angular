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

   isLoggedInn;

  constructor(private http: HttpClient) { }

  getSomeData() {
    return true; // this.http.get<myData>('/api/database.php')
  }

  // isLoggedIn() : Observable<isLoggedIn> {
  //   return this.http.get<isLoggedIn>('/api/isloggedin.php')
  // }

  isLoggedIn()  : Observable<isLoggedIn> {
  
    return this.http.post<isLoggedIn>("http://192.168.1.127:5000/isLoggedIn" || "/api/isLoggedIn", {  });

  }

  logout() {
    return true;  //this.http.get<logoutStatus>('/api/logout.php')
  }

  
}
