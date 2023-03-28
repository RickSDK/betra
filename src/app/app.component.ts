import { Component } from '@angular/core';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'betra';
  constructor(
    private location: LocationStrategy
  ) {
    // check if back or forward button is pressed.

    //history.pushState(null, 'null', window.location.href);  
    this.location.onPopState(() => {
      console.log('back button pressed!!');
      //history.pushState(null, 'null', window.location.href);
      window.history.forward();
      return false;
    }); 

//    this.location.onPopState(() => {
      // set isBackButtonClicked to true.
  //    console.log('back button pressed!!');
    //  return false;
    //});
  }
}
