import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { SecureStorageService } from '../services/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProtectedRoutes implements CanActivate {
  constructor(
    private router: Router,
    private secureStorageService: SecureStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const dataMenus = JSON.parse(this.secureStorageService.getData("menus") ?? "")

    if(dataMenus){
    
        const hasAccessAction = dataMenus.some((item: any) => item.action === state.url);

        if (hasAccessAction) {
            return true;
        } else {
            this.router.navigate(['/error/AccessDeniedPage']);
            return false;
        }

    }
    return false
  }
}