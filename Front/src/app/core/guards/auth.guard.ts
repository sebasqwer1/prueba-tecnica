import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SecureStorageService } from '../services/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private secureStorageService: SecureStorageService) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      let menus = this.secureStorageService.getData("menus")
      if (menus == ""){
        this.router.navigate(['/auth/login']);
        return false;
      }else{
        return true;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}