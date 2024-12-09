import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/core/interfaces/menu-item';
import { AuthService } from 'src/app/core/services/auth.service';
import { SecureStorageService } from 'src/app/core/services/secure-storage.service';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent { 

  home = { icon: 'pi pi-home', routerLink: '/' };

  renderMenu: any[] = [];
  cloneMenu: any[] = [];

  flagMenuActive: boolean = false;
  menuLoaded!: boolean;
  isVisibleImage: boolean = true;
  isVisible: boolean = false;
  browserRefresh: boolean = false;
  flagSidebar: boolean = false
  flagMode:boolean = false

  textMode:string = "Oscuro"
  iconMode:string = "bx-moon"
  title:string = '';
  username:string = ''
  name:string = ''


  constructor(
    private themeService: ThemeService,
    private routerparams: Router, 
    private authService: AuthService,
    private secureStorageService: SecureStorageService
  ){
    
    const body = document.querySelector("body"),
          modeSwitch = body?.querySelector(".toggle-switch");

          modeSwitch?.addEventListener("click", ()=>{
            body?.classList.toggle("dark")
          })
  }

  ngOnInit() {

    const dataMenus = JSON.parse(this.secureStorageService.getData("menus") ?? "");
    this.groupMenu(dataMenus);

    const session = this.secureStorageService.getData("session")

    if(session){
      this.name = JSON.parse(session).name
      this.username = JSON.parse(session).user_name
    }
    console.log("session",session)
  }


  filterMenu(menuData: any, searchText: any) {

    const childFiltered = menuData.filter((parent: any) => {
        const child = parent.children.find((child: any) => child.text.toLowerCase().includes(searchText.toLowerCase()));
        return child !== undefined;
    });

    const parentFiltered = menuData.filter((parent: any) => {
        return parent.text.toLowerCase().includes(searchText.toLowerCase());
    });

    if (childFiltered.length > 0) {
        const parentsWithFilteredChild = childFiltered.map((parent: any) => {
            const filteredChild = parent.children.find((child: any) => child.text.toLowerCase().includes(searchText.toLowerCase()));
            return {
                ...parent,
                children: [filteredChild]
            };
        });
        return parentsWithFilteredChild;
    } else if (parentFiltered.length > 0) {
        const parentWithAllChildren = parentFiltered.map((parent: any) => {
            return {
                ...parent,
                children: parent.children
            };
        });
        return parentWithAllChildren;
    }

    return [];
  }


  modeSwitch(){

    this.flagMode = !this.flagMode;

    const body = document.querySelector("body")
    body?.classList.toggle("dark")

    if(this.flagMode){
      this.textMode = "Claro"
      this.iconMode = "bx-sun"
      this.themeService.switchTheme("dark")

    }else{
      this.textMode = "Oscuro"
      this.iconMode = "bx-moon"
      this.themeService.switchTheme("light")
    }
  }

  toggle(){

    if(!this.flagSidebar) this.contractAll(this.cloneMenu);

    const sidebar = document.querySelector(".sidebar")
    sidebar?.classList.toggle("close")
    this.flagSidebar = !this.flagSidebar
    
  }

  getText(target: any){
    console.log(target.value)


    if (target.value ==""){
      this.cloneMenu = this.renderMenu
    }else{
      const dataFiltrada = this.filterMenu(this.renderMenu, target.value)
      console.log("dataFiltrada",dataFiltrada)
      this.cloneMenu = dataFiltrada
      this.expandtAll(this.cloneMenu);
    }
    
  }

  toggleSearch(opcion: string){
    const sidebar = document.querySelector(".sidebar")
    if (sidebar?.classList.contains("close") && opcion == "buscar") {
      sidebar?.classList.toggle("close")
      this.flagSidebar = !this.flagSidebar
    }
    
  }

  onDashboard(){
    this.routerparams.navigate(['/adm/dashboard']);
  }

  onIndex(){
    this.routerparams.navigate(['/']);
  }

  groupMenu(menu: MenuItem[]): void {
    this.renderMenu = [];
    while (menu.length > 0) {
      menu.forEach((menuItem: MenuItem): void => {
        menuItem.text = this.capitalizeSentence(menuItem.text);
        menuItem.children = [];

        if (!menuItem.menuFatherId) {
          const index: number = menu.indexOf(menuItem);
          if (index !== -1) {
            menu.splice(index, 1);
          }
          this.renderMenu.push(menuItem);
          this.renderMenu.sort(this.compareOrders);

        } else {
          const father: string = menuItem.menuFatherId;

          this.searchFather(this.renderMenu, father, menuItem, menu);
        }
      });
    }
    this.menuLoaded = true;
    this.cloneMenu = JSON.parse(JSON.stringify(this.renderMenu));
  }

  searchFather(menuArray: MenuItem[], father:any, menuItem: MenuItem, menu:any): void {
    menuArray.forEach((menuPainted: MenuItem): void => {
      if (menuPainted.id === father) {
        menuPainted.children.push(menuItem);

        menuPainted.children.sort(this.compareOrders);

        const index: number = menu.indexOf(menuItem);
        if (index !== -1) {
          menu.splice(index, 1);
        }
      } else {
        this.searchFather(menuPainted.children, father, menuItem, menu);
      }
    });
  }

  capitalizeSentence(sentence: string): string {
    const words: string[] = sentence.split(" ");
    const capitalizedWords: string[] = words.map((word: string) => {
      word = word.toLowerCase();
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(" ");
  }

  compareOrders(p1:any, p2:any): number {
    if (p1.order > p2.order) {
      return 1;
    } else if (p1.order < p2.order) {
      return -1;
    } else {
      return 0;
    }
  }

  contractAll(menuItems: any[]): void {
    menuItems.forEach(menuItem => {
      menuItem.isCollapsed = false;
      if (menuItem.children && menuItem.children.length > 0) {
        this.contractAll(menuItem.children);
      }
    });
  }

  expandtAll(menuItems: any[]): void {
    menuItems.forEach(menuItem => {
      menuItem.isCollapsed = true;
      if (menuItem.children && menuItem.children.length > 0) {
        this.contractAll(menuItem.children);
      }
    });
  }

  getClick(event:boolean){
    
    if(event){

      if(!this.flagSidebar) this.contractAll(this.cloneMenu)
  
      const sidebar = document.querySelector(".sidebar")
      sidebar?.classList.toggle("close")
      this.flagSidebar = !this.flagSidebar
    }

  }

  getOnAccionMiniNav(event:boolean){

    if(event){
      if(this.flagSidebar){
        this.toggle()
      }
    }

  }

  logout(){

    if(this.flagMode) this.lightModeReset();

    this.authService.logout()
    this.routerparams.navigate(["/auth/login"])

  }

  lightModeReset(){
    const body = document.querySelector("body")
    body?.classList.toggle("dark")
    this.themeService.switchTheme("light")
    this.flagMode = true;
  }

}
