import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

  @Input("code") code!: string;
  @Input("title") title!: string;
  @Input("subtitle") subtitle!: string;

  constructor() {}

}
