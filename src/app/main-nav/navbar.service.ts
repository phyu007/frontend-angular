import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;

  constructor() { }

  hide() { this.visible = true; };

  show() { this.visible = false;   };

 
}