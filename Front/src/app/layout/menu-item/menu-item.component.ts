import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '../../core/interfaces/menu-item';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent {

  @Input("menuItem") menuItem!: MenuItem;
  @Input("flagSidebar") flagSidebar: boolean = false;

  @Output() clickEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onAccionMiniNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('collapseBasic') collapseBasicElement!: ElementRef;
  
  hasChildrens:boolean = false;
  isIconUp: boolean = true;

  constructor(private routerparams: Router){ }

  ngOnInit() {

    if (this.menuItem.children.length > 0) {
      this.hasChildrens = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {

      if(propName === 'flagSidebar'){
        this.flagSidebar = changes[propName].currentValue;
        if (this.collapseBasicElement) {
          if (this.flagSidebar == true) {
            this.isIconUp = true
          }
        }
      }

    }
  }

  getClick(event:any){
    this.clickEmit.emit(true)
  }


  getOnAccionMiniNav(event:any){
    this.onAccionMiniNav.emit(true)
  }

  collapeMenu(){
    this.menuItem.isCollapsed = !this.menuItem.isCollapsed
    this.isIconUp = !this.isIconUp;
  }

  onNavigate(ruta:string){

    this.clickEmit.emit(true)
    if(ruta == null) return
    this.routerparams.navigate([ruta]);

  }

  onAccion(){
    this.onAccionMiniNav.emit(true);
  }

 }
