import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})

export class WidgetComponent {

  @Input("balance") balance!: number;
  @Input("consumption") consumption!: number;
  @Input("minutes") minutes!: number;
  @Input("actualizacion") actualizacion!: string;

  constructor() {}

}
