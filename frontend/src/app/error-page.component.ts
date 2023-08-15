import { Component } from '@angular/core';

@Component({
  selector: 'app-error-page',
  template: `
  <div>
    <h1 [ngStyle]="{color:'red'}">
      404 PAGE NOT FOUND !
    </h1>
  </div>  
  `,
  styles: [
  ]
})
export class ErrorPageComponent {

}
