import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { PartsService } from '../parts.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  



  public cat = [];
  faBars = faBars;
  faUser = faUser;
  faBell = faBell;
  faCog = faCog;
  public category;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


    @Output('change') change = new EventEmitter();



    public onChange(event): void {
       this.category = event.target.value;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      this.PartsService.getChosenCategory(this.category);
      this.PartsService.sharedData = this.category;
      this.change.emit(this.category);
      this.PartsService.choose(this.category);
     }


     public changed(event)
     {
       if(event.isUserInput) {
         console.log(event.source.value, event.source.selected);
       }
     }


    


     get data():string{
       return this.PartsService.sharedData;
     }

     set data(value:string){
      
     }

  constructor(private breakpointObserver: BreakpointObserver,private http: HttpClient, public PartsService: PartsService) {

    PartsService.getCategory();
   // this.PartsService.postCategory(this.category);
    this.cat = PartsService.cat;

    this.PartsService.setData(this.category);

    console.log(this.category);

  }



}


export interface SKUEventArgs {
  category : string;
}