import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PartsService } from '../parts.service';
import { Router } from '@angular/router';
import { NavbarService } from '../main-nav/navbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor( private Auth: AuthService, private Part: PartsService,public nav: NavbarService  ,private router: Router) { }
   isLoggedIn = false ; 
  ngOnInit(): void {
    this.nav.hide();
  }

  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    


    this.Auth.getUserDetails(username, password).subscribe
    (
      
      res => {

      console.log(username)
      console.log(password)
      console.log(res);

      let details =  res.recordset[0];
 
      console.log(details.username)
      console.log(username)

      if(details.username == username)
      {
        this.isLoggedIn = true;
        this.router.navigate(['dashboard'])
        this.Auth.setLoggedIn(this.isLoggedIn);
        console.log(this.Auth.isLoggedIn)
      }
      else {
           window.alert('Error!')
         }

    })
    console.log(username, password)
  }

}
