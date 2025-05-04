import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import jquery from "./../../node_modules/jquery/dist/jquery.min.js";
// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl:`<router-outlet></router-outlet>`,
// })
// export class AppComponent {
//   title = 'frontend';
// }
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>' 
})
export class AppComponent {
  title = 'frontend';
}