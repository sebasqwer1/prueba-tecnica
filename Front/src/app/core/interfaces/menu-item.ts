export interface MenuItem {
    id: string;
    text: string;
    action: string;
    icon: string;
    menuFatherId: string ;
    children: any[];
    order: number;
    isCollapsed?: any;
}
  