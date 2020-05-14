import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { PartsService } from './parts.service';
import { Router } from '@angular/router';
import { NavbarService } from './main-nav/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
ngOnInit(): void {
    // this.nav.hide();
    // this.router.navigate(['login']);

  }
  constructor( private Auth: AuthService, private Part: PartsService,public nav: NavbarService  ,private router: Router) { }
  
  title = 'Frontend';
 // isLoggedIn$: boolean;                  // check isLoggedIn
  isLoggedIn$ = false;



}
