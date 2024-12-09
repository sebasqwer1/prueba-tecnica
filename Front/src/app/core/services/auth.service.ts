import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ParamMain } from 'src/app/core/interfaces/param-main'
import { SecureStorageService } from './secure-storage.service';

import { Observable, map } from 'rxjs';
import { CommunicationConstants } from 'src/app/core/constants/communication';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_LOGIN : string =  environment.serverUrl + "login";

  paramMain!: ParamMain;

  constructor(
    private routerParam: Router,
    private _http: HttpClient,
    private secureStorageService: SecureStorageService
  ) { }

  createHeader() {
    let headers: HttpHeaders;
      headers = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Accept', 'application/json; charset=utf-8')
      return headers;
  }

  login(request : any) : Observable<any>{


    return this._http
      .post<any>(this.URL_LOGIN, request, { headers: this.createHeader() })
      .pipe(
          map((res: any) => {
              const [codigosCom, mensajesCom] = CommunicationConstants;
              if (res === null){
                  throw new Error(`${codigosCom.ERRORSRV}||${mensajesCom.MSGDATAVACIOSRV}`);
              }
              
              return res;
          })
      );
  }
  
  logout(): void {
    this.secureStorageService.clearData()
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

}