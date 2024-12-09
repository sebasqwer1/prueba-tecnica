import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { SecureStorageService } from '../services/secure-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private secureStorageService:SecureStorageService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): 
    Observable<HttpEvent<unknown>> {
      let cloneRequest = request;

      const accessToken = this.secureStorageService.getData("jwt")

      if(accessToken){
        cloneRequest = request.clone({
          setHeaders:{
            Authorization : accessToken
          }
        })
      }

      console.log("cloneRequest",cloneRequest)

      return next.handle(cloneRequest)
  }
}
