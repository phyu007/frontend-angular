import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  faBell = faBell;
  faCog = faCog;

  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

  navbarOpen = false;

  toggleNavbar()
  {
    this.navbarOpen = !this.navbarOpen;
  }





}
