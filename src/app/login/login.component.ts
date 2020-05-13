import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor( private Auth: AuthService,  private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value

    this.Auth.getUserDetails(username, password).subscribe
    (res => {

      console.log(username)
      console.log(password)
      console.log(res);

      let details =  res.recordset[0];

      console.log(details.username)
      console.log(username)

      if(details.username == username)
      {
        this.router.navigate(['dashboard'])
      }
      else {
           window.alert('Error!')
         }

      // if(data.success) {
      //   this.router.navigate(['dashboard'])
      //   this.Auth.setLoggedIn(true)
      // } else {
      //   window.alert(data.message)
      // }
    })
    console.log(username, password)
  }

}
